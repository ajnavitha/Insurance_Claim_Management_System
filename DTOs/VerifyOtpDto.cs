using System.ComponentModel.DataAnnotations;

namespace InsuranceAPI.DTOs
{
    public class VerifyOtpDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string OtpCode { get; set; } = string.Empty;
    }
}
