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

public class ImageController : ControllerBase
{
    private capstoneDbContext _dbContext;

    public ImageController(capstoneDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    // [Authorize]

    public IActionResult GetImages(){
        return Ok(_dbContext.Images
        .Include(i => i.Property)
        .ToList());
    }

    [HttpPost]
    // [Authorize]

    public IActionResult AddImage(Image newImage){
        _dbContext.Images.Add(newImage);
        _dbContext.SaveChanges();

        return Created($"/api/image/{newImage.Id}", newImage);
    }

    [HttpDelete("{id}")]
    // [Authorize]

    public IActionResult DeleteImage(int? id){
        Image imageToDelete = _dbContext.Images.SingleOrDefault(i => i.Id == id);
        if (imageToDelete == null)
        {
            return NotFound();
        }
        _dbContext.Images.Remove(imageToDelete);
        _dbContext.SaveChanges();
        
        return NoContent();

    }





}