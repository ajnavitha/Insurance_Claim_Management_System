using System;
using System.ComponentModel.DataAnnotations;

namespace InsuranceAPI.Models
{
    public class FraudAlert
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int ClaimId { get; set; }

        [Required]
        public int FraudScore { get; set; } // 0 to 100

        [Required]
        public string AlertReason { get; set; } = string.Empty;

        public DateTime ReportedAt { get; set; } = DateTime.Now;

        public bool IsReviewed { get; set; } = false;
    }
}
