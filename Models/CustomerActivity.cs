using System;
using System.ComponentModel.DataAnnotations;

namespace InsuranceAPI.Models
{
    public class CustomerActivity
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public string Action { get; set; } = string.Empty; // e.g. "Login", "Submitted Claim", "Purchased Policy"

        public string? Details { get; set; }

        public DateTime Timestamp { get; set; } = DateTime.Now;
    }
}
