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
[Route("/api/[controller]")]

public class MessageController : ControllerBase
{

    private capstoneDbContext _dbContext;

    public MessageController(capstoneDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    // [Authorize]

    public IActionResult GetMessages(){

    return Ok(_dbContext.Messages
    .Include(m => m.Recipient)
    .Include(m => m.Sender)
    .ToList());

    }

    [HttpPost]
    // [Authorize]

    public IActionResult CreateMessage(Message newMessage)
    {
        _dbContext.Messages.Add(newMessage);
        _dbContext.SaveChanges();

        return Created($"/api/message/${newMessage.Id}", newMessage);


    }

    [HttpGet("{id}")]
    // [Authorize]

    public IActionResult GetMessagesForUser(int id){
        
        List<Message> foundMessages = new List<Message>();
        foundMessages = _dbContext.Messages
        .Include(m => m.Recipient)
        .Include(m => m.Sender)
        .Where(m => m.RecipientId == id).ToList();
        return Ok(foundMessages);

    }

    [HttpDelete("{id}")]
    [Authorize]

    public IActionResult DeleteMessage(int id)
    {
        Message messageToDelete = _dbContext.Messages.SingleOrDefault(m => m.Id == id);
        _dbContext.Messages.Remove(messageToDelete);
        _dbContext.SaveChanges();

        return NoContent();
    }


}
