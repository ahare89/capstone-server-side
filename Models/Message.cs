namespace capstone.Models;
public class Message {
    public int Id { get; set; }
    public int SenderId { get; set; }

    public int ReceiverId { get; set; }

    public string Content { get; set; }

    public string Subject { get; set; }

    
}