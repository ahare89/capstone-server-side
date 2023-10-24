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
using Microsoft.AspNetCore.Mvc.RazorPages.Infrastructure;

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

    // [HttpGet]
    [Authorize]
    public IActionResult GetProperties()
    {

        var propertiesWithImages = _dbContext.Properties
        .Include(p => p.Images)
        .Include(p => p.PropertyType)
        .Include(p => p.UserProfile)
        .ThenInclude(up => up.IdentityUser)
        .ToList();

        return Ok(propertiesWithImages);
    }

    [HttpGet("available")]
    // [Authorize]

    public IActionResult GetAvailableProperties()
    {

        return Ok(_dbContext.Properties
        .Include(p => p.Images)
        .Include(p => p.PropertyType)
        .Include(p => p.UserProfile)
        .ThenInclude(up => up.IdentityUser)
        .Where(p => p.isActive == true)
        .ToList());
    }

    [HttpGet("{id}")]
    // [Authorize]
    public IActionResult GetPropertyWithImages(int id)
    {

        Property foundProperty = _dbContext.Properties
        .Include(p => p.Images)
        .Include(p => p.PropertyType)
        .Include(p => p.UserProfile)
        .ThenInclude(up => up.IdentityUser)
        .SingleOrDefault(p => p.Id == id);
        if (foundProperty == null)
        {
            return NotFound();
        }

        UserProfile foundUserProfile = _dbContext.UserProfiles
        .Include(up => up.IdentityUser).Select(up => new UserProfile{
            Id = up.Id,
            FirstName = up.FirstName,
            LastName = up.LastName,
            Address = up.Address,
            Email = up.IdentityUser.Email,
            UserName = up.IdentityUser.UserName,
            IdentityUserId = up.IdentityUserId,
            Roles = _dbContext.UserRoles
            .Where(ur => ur.UserId == up.IdentityUserId)
            .Select(ur => _dbContext.Roles.SingleOrDefault(r => r.Id == ur.RoleId).Name)
            .ToList()
        })
        .SingleOrDefault(up => up.Id == id);

        foundProperty.UserProfile = foundUserProfile;

        List<Image> matchedImages = new List<Image>();
        matchedImages = _dbContext.Images.Where(i => i.PropertyId == id).ToList();
        foundProperty.Images = matchedImages;

        return Ok(foundProperty);

    }

    [HttpGet("myproperties")]
    // [Authorize]

    public IActionResult GetPropertiesByUser(int userId)
    {
        return Ok(_dbContext.Properties
        .Include(p => p.Images)
        .Include(p => p.PropertyType)
        .Include(p => p.UserProfile)
        .Where(p => p.UserProfileId == userId));
    }

    [HttpPost]
    // [Authorize]

    public IActionResult AddAProperty(Property newProperty)
    {

        _dbContext.Properties.Add(newProperty);
        newProperty.UserProfile = _dbContext.UserProfiles.SingleOrDefault(up => up.Id == newProperty.UserProfileId);
        _dbContext.SaveChanges();


        return Created($"/api/property/${newProperty.Id}", newProperty);
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

    [HttpPut("{id}")]
    // [Authorize]

    public IActionResult UpdateProperty(int id, Property property)
    {

        Property propertyToUpdate = _dbContext.Properties.SingleOrDefault(p => p.Id == id);
        if (propertyToUpdate == null)
        {
            return NotFound();
        }

        propertyToUpdate.Address = property.Address;
        propertyToUpdate.SqFt = property.SqFt;
        propertyToUpdate.Description = property.Description;
        propertyToUpdate.PropertyTypeId = property.PropertyTypeId;
        propertyToUpdate.isActive = property.isActive;
        propertyToUpdate.CleaningCost = property.CleaningCost;
        _dbContext.SaveChanges();

        return NoContent();


    }

}