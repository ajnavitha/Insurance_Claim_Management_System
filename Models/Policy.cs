using System.ComponentModel.DataAnnotations;

namespace InsuranceAPI.Models
{
    public class Policy
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string PolicyName { get; set; } = string.Empty;

        [Required]
        public string PolicyType { get; set; } = string.Empty;

        public decimal PremiumAmount { get; set; }

        public decimal CoverageAmount { get; set; }

        public int DurationInYears { get; set; }

        public string Description { get; set; } = string.Empty;
    }
}