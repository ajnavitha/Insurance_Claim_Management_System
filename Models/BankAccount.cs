using System.ComponentModel.DataAnnotations;

namespace InsuranceAPI.Models
{
    public class BankAccount
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public string BankName { get; set; } = string.Empty;

        [Required]
        public string AccountHolder { get; set; } = string.Empty;

        [Required]
        public string AccountNumber { get; set; } = string.Empty; // Store masked/encrypted

        public decimal Balance { get; set; }

        public decimal AvailableBalance { get; set; }

        public bool AutoDebitEnabled { get; set; } = false;
    }
}
