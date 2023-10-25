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
using Microsoft.EntityFrameworkCore.Query.SqlExpressions;

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

    [HttpGet("myschedule/{userId}")]
    // [Authorize]

    public IActionResult GetCleaningJobsForUser(int userId){

        return Ok(_dbContext.CleaningJobs
        .Include(cj => cj.Property)
        .Include(cj => cj.UserProfile)
        .OrderBy(cj => cj.Date)
        .Where(cj => cj.UserProfileId == userId).ToList());

    }

    [HttpGet("{propertyId}")]
    // [Authorize]

    public IActionResult GetCleaningJobsForProperty(int propertyId)
    {
        return Ok(_dbContext.CleaningJobs
        .Include(cj => cj.Property)
        .Include(cj => cj.UserProfile)
        .Where(cj => cj.PropertyId == propertyId)
        .ToList());

    }

    [HttpDelete("{id}")]
    // [Authorize]

    public IActionResult DeleteCleaningJob (int id)
    {
        CleaningJob cleaningJobToDelete = _dbContext.CleaningJobs.SingleOrDefault(cj => cj.Id == id);
        _dbContext.CleaningJobs.Remove(cleaningJobToDelete);
        _dbContext.SaveChanges();
        return NoContent();
    }





}