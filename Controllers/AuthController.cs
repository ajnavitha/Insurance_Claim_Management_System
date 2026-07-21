using InsuranceAPI.DTOs;
using InsuranceAPI.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace InsuranceAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _service;

        public AuthController(IAuthService service)
        {
            _service = service;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto dto)
        {
            var result = await _service.Register(dto);

            if (result == "Email already registered")
            {
                return BadRequest(new { message = result });
            }

            return Ok(new { message = result });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            var result = await _service.Login(dto);

            var messageProperty = result.GetType().GetProperty("message");

            if (messageProperty != null)
            {
                return Unauthorized(new { message = messageProperty.GetValue(result) });
            }

            return Ok(result);
        }

        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh([FromBody] RefreshTokenDto dto)
        {
            var result = await _service.RefreshToken(dto);
            var messageProp = result.GetType().GetProperty("message");
            if (messageProp != null)
            {
                return BadRequest(new { message = messageProp.GetValue(result) });
            }
            return Ok(result);
        }

        [HttpPost("send-otp")]
        public async Task<IActionResult> SendOtp([FromQuery] string email)
        {
            var result = await _service.SendOtp(email);
            return Ok(new { message = result });
        }

        [HttpPost("verify-otp")]
        public async Task<IActionResult> VerifyOtp([FromBody] VerifyOtpDto dto)
        {
            var isValid = await _service.VerifyOtp(dto);
            if (!isValid)
            {
                return BadRequest(new { message = "Invalid or expired OTP code." });
            }
            return Ok(new { message = "OTP verified successfully." });
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDto dto)
        {
            var result = await _service.ResetPassword(dto);
            return Ok(new { message = result });
        }
    }
}