using System.ComponentModel.DataAnnotations;

namespace InsuranceAPI.DTOs
{
    public class PaymentRequestDto
    {
        [Required]
        public string PolicyNumber { get; set; } = string.Empty;

        [Required]
        public decimal Amount { get; set; }

        [Required]
        public string PaymentMethod { get; set; } = string.Empty;
    }
}
