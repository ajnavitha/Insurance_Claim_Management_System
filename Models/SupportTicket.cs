using System.ComponentModel.DataAnnotations;

namespace InsuranceAPI.Models
{
    public class SupportTicket
    {
        [Key]
        public int Id { get; set; }

        public int UserId { get; set; }

        [Required]
        public string Subject { get; set; } = string.Empty;

        [Required]
        public string Message { get; set; } = string.Empty;

        public string Status { get; set; } = "Open";

        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}