using System.ComponentModel.DataAnnotations;

namespace InsuranceAPI.DTOs
{
    public class ClaimDto
    {
        [Required]
        public string PolicyNumber { get; set; } = string.Empty;

        [Required]
        public string ClaimType { get; set; } = string.Empty;

        [Required]
        public decimal Amount { get; set; }

        public string Description { get; set; } = string.Empty;

        public string? DocumentPath { get; set; }
    }
}