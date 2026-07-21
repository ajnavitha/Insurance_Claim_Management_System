using System.ComponentModel.DataAnnotations;

namespace InsuranceAPI.Models
{
    public class Payment
    {
        [Key]
        public int Id { get; set; }

        public int UserId { get; set; }

        [Required]
        public string PolicyNumber { get; set; } = string.Empty;

        [Required]
        public decimal Amount { get; set; }

        [Required]
        public string PaymentMethod { get; set; } = string.Empty;

        public string Status { get; set; } = "Success";

        public DateTime PaymentDate { get; set; } = DateTime.Now;

        public string TransactionId { get; set; } = Guid.NewGuid().ToString();
    }
}