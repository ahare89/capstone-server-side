using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;
namespace capstone.Models;


public class UserProfile
{
    public int Id { get; set; }
    [Required]
    public string FirstName { get; set; }
    [Required]
    public string LastName { get; set; }
    [Required]
    public string Address { get; set; }

    [NotMapped][EmailAddress] // not mapped means that EF Core won't create column for this property in the db
    public string Email { get; set; }
    [NotMapped][MaxLength(50)]
    public string UserName { get; set; }
    [NotMapped]
    public List<string> Roles { get; set; }

    public string IdentityUserId { get; set; }

    public IdentityUser? IdentityUser { get; set; }


}