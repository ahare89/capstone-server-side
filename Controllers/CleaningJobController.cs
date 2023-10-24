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

public class CleaningJobController: ControllerBase
{
    private capstoneDbContext _dbContext;

    public CleaningJobController(capstoneDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    // [Authorize]

    public IActionResult GetCleaningJobs(){
    
    return Ok(_dbContext.CleaningJobs
    .Include(cj => cj.Property)
    .Include(cj => cj.UserProfile));
    
    }

    [HttpPost]
    // [Authorize]

    public IActionResult CreateCleaningJob(CleaningJob newCleaningJob)
    {
        _dbContext.Add(newCleaningJob);
        _dbContext.SaveChanges();
        
        return Created($"/api/cleaningjob/{newCleaningJob.Id}", newCleaningJob);

    }




}