using InsuranceAPI.Data;
using InsuranceAPI.DTOs;
using InsuranceAPI.Helpers;
using InsuranceAPI.Interfaces;
using InsuranceAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace InsuranceAPI.Services
{
    public class AuthService : IAuthService
    {
        private readonly ApplicationDbContext _context;
        private readonly JwtHelper _jwtHelper;

        public AuthService(ApplicationDbContext context, JwtHelper jwtHelper)
        {
            _context = context;
            _jwtHelper = jwtHelper;
        }

        public async Task<string> Register(RegisterDto dto)
        {
            var existingUser = await _context.Users
                .FirstOrDefaultAsync(x => x.Email == dto.Email);

            if (existingUser != null)
            {
                return "Email already registered";
            }

            var user = new User
            {
                Name = dto.Name,
                Age = dto.Age,
                Work = dto.Work,
                Email = dto.Email,
                Phone = dto.Phone,
                Password = HashPassword(dto.Password),
                Role = "Customer",
                IsEmailVerified = true
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return "Registration successful";
        }

        public async Task<object> Login(LoginDto dto)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(x => x.Email == dto.Email);

            if (user == null)
            {
                return new { message = "Invalid email or password" };
            }

            var hashedPassword = HashPassword(dto.Password);

            if (user.Password != hashedPassword)
            {
                return new { message = "Invalid email or password" };
            }

            var token = _jwtHelper.GenerateToken(user);
            var refreshToken = Guid.NewGuid().ToString("N");

            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiry = DateTime.Now.AddDays(7);
            await _context.SaveChangesAsync();

            return new
            {
                token = token,
                refreshToken = refreshToken,
                id = user.Id,
                name = user.Name,
                email = user.Email,
                role = user.Role
            };
        }

        public async Task<object> RefreshToken(RefreshTokenDto dto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.RefreshToken == dto.RefreshToken);
            if (user == null || user.RefreshTokenExpiry < DateTime.Now)
            {
                return new { message = "Invalid or expired refresh token" };
            }

            var newToken = _jwtHelper.GenerateToken(user);
            var newRefreshToken = Guid.NewGuid().ToString("N");

            user.RefreshToken = newRefreshToken;
            user.RefreshTokenExpiry = DateTime.Now.AddDays(7);
            await _context.SaveChangesAsync();

            return new
            {
                token = newToken,
                refreshToken = newRefreshToken
            };
        }

        public async Task<string> SendOtp(string email)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user == null) return "User not found";

            var otp = new Random().Next(100000, 999999).ToString();
            user.OtpCode = otp;
            user.OtpExpiry = DateTime.Now.AddMinutes(10);
            await _context.SaveChangesAsync();

            return $"OTP generated: {otp}"; // Simulating SMS/Email dispatch
        }

        public async Task<bool> VerifyOtp(VerifyOtpDto dto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
            if (user == null || user.OtpCode != dto.OtpCode || user.OtpExpiry < DateTime.Now)
            {
                return false;
            }

            user.OtpCode = null;
            user.OtpExpiry = null;
            user.IsEmailVerified = true;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<string> ResetPassword(ResetPasswordDto dto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
            if (user == null) return "User not found";

            user.Password = HashPassword(dto.NewPassword);
            await _context.SaveChangesAsync();
            return "Password reset successful";
        }

        private string HashPassword(string password)
        {
            using var sha = SHA256.Create();
            var bytes = Encoding.UTF8.GetBytes(password);
            var hash = sha.ComputeHash(bytes);
            return Convert.ToBase64String(hash);
        }
    }
}