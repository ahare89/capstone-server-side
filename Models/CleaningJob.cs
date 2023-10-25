namespace capstone.Models;

public class CleaningJob { 
    public int Id { get; set; }
    public int PropertyId { get; set; }

    public Property? Property { get; set; }
    public int UserProfileId { get; set; }

    public UserProfile? UserProfile { get; set; }

    public DateTime Date { get; set;}
}

