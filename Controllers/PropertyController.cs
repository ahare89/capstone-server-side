using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Text;
using capstone_server_side.Models;
using capstone_server_side.Data;
using Microsoft.EntityFrameworkCore;

namespace capstone_server_side.Controllers;

[ApiController]
[Route("api/[controller]")]

public class PropertyController : ControllerBase
{
    private capstone_server_sideDbContext _dbContext;

    public PropertyController(capstone_server_sideDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    // [Authorize]
    public IActionResult GetProperties() {
        return Ok(_dbContext.Properties.ToList());
    }
}