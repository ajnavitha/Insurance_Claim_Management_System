using System;
using System.ComponentModel.DataAnnotations;

namespace InsuranceAPI.Models
{
    public class FavoritePolicy
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public int PolicyId { get; set; }

        public DateTime SavedAt { get; set; } = DateTime.Now;
    }
}
