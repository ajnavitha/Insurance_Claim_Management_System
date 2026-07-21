using System.ComponentModel.DataAnnotations;

namespace InsuranceAPI.Models
{
    public class UserPolicy
    {
        [Key]
        public int Id { get; set; }

        public int UserId { get; set; }

        public int PolicyId { get; set; }

        public DateTime PurchaseDate { get; set; }

        public string Status { get; set; } = "Active";
    }
}