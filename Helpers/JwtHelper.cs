using InsuranceAPI.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

// Alias for System.Security.Claims.Claim
using SecurityClaim = System.Security.Claims.Claim;

namespace InsuranceAPI.Helpers
{
    public class JwtHelper
    {
        private readonly IConfiguration _configuration;

        public JwtHelper(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string GenerateToken(User user)
        {
            var jwtKey = _configuration["Jwt:Key"];

            if (string.IsNullOrEmpty(jwtKey))
            {
                throw new Exception("JWT Key is missing in appsettings.json");
            }

            var securityKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(jwtKey)
            );

            var credentials = new SigningCredentials(
                securityKey,
                SecurityAlgorithms.HmacSha256
            );

            var claims = new[]
 {
    // User ID
    new SecurityClaim(
        ClaimTypes.NameIdentifier,
        user.Id.ToString()
    ),

    // Subject
    new SecurityClaim(
        JwtRegisteredClaimNames.Sub,
        user.Id.ToString()
    ),

    // Email
    new SecurityClaim(
        JwtRegisteredClaimNames.Email,
        user.Email
    ),

    // Name
    new SecurityClaim(
        ClaimTypes.Name,
        user.Name
    ),

    // Role
    new SecurityClaim(
        ClaimTypes.Role,
        user.Role
    )
};



            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(2),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}