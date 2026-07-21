using System.ComponentModel.DataAnnotations;

namespace InsuranceAPI.Models
{
    public class ClaimDocument
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int ClaimId { get; set; }

        [Required]
        public string DocumentType { get; set; } = string.Empty; // e.g. "RC Book", "Driving License", "Invoice"

        [Required]
        public string DocumentUrl { get; set; } = string.Empty;

        public string? OCRText { get; set; }

        public string QualityCheckStatus { get; set; } = "Pending"; // "Pass", "Fail"

        public double BlurScore { get; set; }

        public string AuthenticityStatus { get; set; } = "Unchecked"; // "Genuine", "Suspected", "Unchecked"
    }
}
