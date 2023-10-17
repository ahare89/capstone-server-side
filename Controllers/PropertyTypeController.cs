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

public class PropertyTypeController: ControllerBase
{
    private capstoneDbContext _dbContext;

    public PropertyTypeController(capstoneDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    // [Authorize]

    public IActionResult getAllPropertyTypes() {
        return Ok(_dbContext.PropertyTypes.ToList());
    }


}

