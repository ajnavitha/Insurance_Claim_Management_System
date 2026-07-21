using InsuranceAPI.DTOs;

namespace InsuranceAPI.Interfaces
{
    public interface IAuthService
    {
        Task<string> Register(RegisterDto dto);
        Task<object> Login(LoginDto dto);
        Task<object> RefreshToken(RefreshTokenDto dto);
        Task<string> SendOtp(string email);
        Task<bool> VerifyOtp(VerifyOtpDto dto);
        Task<string> ResetPassword(ResetPasswordDto dto);
    }
}