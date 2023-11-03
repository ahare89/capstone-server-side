using System.ComponentModel.DataAnnotations.Schema;

namespace capstone.Models;
public class Message {
    public int Id { get; set; }
    public int SenderId { get; set; }
    public int RecipientId { get; set; }
    [ForeignKey("SenderId")]
    public UserProfile? Sender { get; set; }
    [ForeignKey("RecipientId")]
    public UserProfile? Recipient { get; set; }
    public string Content { get; set; }

    public string Subject { get; set; }

    public DateTime Date { get; set; }

    
}