using System.ComponentModel.DataAnnotations;

namespace InsuranceAPI.Models
{
    public class Claim
    {
        [Key]
        public int Id { get; set; }

        public int UserId { get; set; }

        public string PolicyNumber { get; set; } = string.Empty;

        public string ClaimType { get; set; } = string.Empty;

        public decimal Amount { get; set; }

        public string Description { get; set; } = string.Empty;

        public DateTime SubmittedDate { get; set; }

        public string Status { get; set; } = "Pending";

        public string? DocumentPath { get; set; }
    }
}