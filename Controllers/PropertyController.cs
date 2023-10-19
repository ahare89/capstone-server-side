using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Text;
using capstone.Models;
using capstone.Data;
using Microsoft.EntityFrameworkCore;

namespace capstone.Controllers;

[ApiController]
[Route("api/[controller]")]

public class PropertyController : ControllerBase
{
    private capstoneDbContext _dbContext;

    public PropertyController(capstoneDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    // [Authorize]
    public IActionResult GetProperties() {

        var propertiesWithImages = _dbContext.Properties
        .Include(p => p.Images)
        .Include(p => p.PropertyType)
        .ToList();

        return Ok(propertiesWithImages);
    }

    [HttpGet("available")]
    // [Authorize]

    public IActionResult GetAvailableProperties() {

        return Ok(_dbContext.Properties.Include(p => p.Images)
        .Where(p => p.isActive == true)
        .ToList());
    }

    [HttpGet("{id}")]
    // [Authorize]
    public IActionResult GetPropertyWithImages(int id) {

        Property foundProperty = _dbContext.Properties.SingleOrDefault(p => p.Id == id);
        if (foundProperty == null)
        {
            return NotFound();
        }
        List<Image> matchedImages = new List<Image>();
        matchedImages = _dbContext.Images.Where(i => i.PropertyId == id).ToList();
        foundProperty.Images = matchedImages;

        return Ok(foundProperty);

    }

    [HttpGet("myproperties")]
    // [Authorize]

    public IActionResult GetPropertiesByUser(int userId)
    {
        return Ok(_dbContext.Properties.Include(p => p.Images)
        .Where(p => p.UserProfileId == userId));
    }

    [HttpPost]
    // [Authorize]

    public IActionResult AddAProperty(Property newProperty){
        _dbContext.Properties.Add(newProperty);
        _dbContext.SaveChanges();
        return NoContent();
    }

    [HttpDelete("{id}")]
    [Authorize]

    public IActionResult DeleteProperty(int id)
    {
        Property propertyToDelete = _dbContext.Properties.SingleOrDefault(p => p.Id == id);
        if (propertyToDelete == null)
        {
            return NotFound();
        }
        _dbContext.Remove(propertyToDelete);
        _dbContext.SaveChanges();

        return NoContent();
    }
   
}