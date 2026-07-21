namespace InsuranceAPI.Models
{
    public class User
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int Age { get; set; }

        public string Work { get; set; }

        public string Email { get; set; }

        public string Phone { get; set; }

        public string Password { get; set; }

        public string Role { get; set; }

        public string? RefreshToken { get; set; }

        public DateTime? RefreshTokenExpiry { get; set; }

        public string? OtpCode { get; set; }

        public DateTime? OtpExpiry { get; set; }

        public bool IsEmailVerified { get; set; } = false;
    }
}