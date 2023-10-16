using System.ComponentModel.DataAnnotations;
namespace capstone_server_side.Models;

public class PropertyType { 
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }
}