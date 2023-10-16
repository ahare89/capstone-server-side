using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
namespace capstone.Models;

public class Property {

    public int Id { get; set; }
    [Required]
    public string Address { get; set; }
    public int UserProfileId { get; set; }
    public int SqFt { get; set; }
    [Required]
    public string Description { get; set; }
    public int PropertyTypeId { get; set; }
    public bool isActive { get; set; }

    public List<Image> Images { get; set; }

}