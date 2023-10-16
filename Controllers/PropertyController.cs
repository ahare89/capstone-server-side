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
        return Ok(_dbContext.Properties.ToList());
    }

    [HttpGet("available")]
    // [Authorize]

    public IActionResult GetAvailableProperties() {

        return Ok(_dbContext.Properties
        .Where(p => p.isActive == true)
        .Include(p => p.Images)
        .Where(i)
        .ToList());
    }

    [HttpGet("images")]
    public IActionResult GetAllPropertyImages()
    {
        try
        {
            // Retrieve all properties with their associated images.
            var propertiesWithImages = _dbContext.Properties.Include(p => p.Images).ToList();

            // Extract image URLs from all properties' Images collections.
            var allImageUrls = propertiesWithImages.SelectMany(p => p.Images.Select(img => img.Url)).ToList();

            return Ok(propertiesWithImages);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}