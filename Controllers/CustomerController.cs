using InsuranceAPI.Data;
using InsuranceAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace InsuranceAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Customer")]
    public class CustomerController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CustomerController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Get Customer Profile
        [HttpGet("profile")]
        public async Task<IActionResult> GetProfile()
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

            var user = await _context.Users.FindAsync(userId);

            if (user == null)
                return NotFound(new
                {
                    message = "User not found"
                });

            return Ok(user);
        }

        // Update Customer Profile
        [HttpPut("profile")]
        public async Task<IActionResult> UpdateProfile(User updatedUser)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

            var user = await _context.Users.FindAsync(userId);

            if (user == null)
                return NotFound(new
                {
                    message = "User not found"
                });

            user.Name = updatedUser.Name;
            user.Age = updatedUser.Age;
            user.Work = updatedUser.Work;
            user.Phone = updatedUser.Phone;
            user.Email = updatedUser.Email;

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Profile updated successfully",
                user
            });
        }

        // View My Claims
        [HttpGet("claims")]
        public async Task<IActionResult> GetMyClaims()
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

            var claims = await _context.Claims
                .Where(c => c.UserId == userId)
                .ToListAsync();

            return Ok(claims);
        }

        // View Single Claim
        [HttpGet("claims/{id}")]
        public async Task<IActionResult> GetClaim(int id)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

            var claim = await _context.Claims
                .FirstOrDefaultAsync(c => c.Id == id && c.UserId == userId);

            if (claim == null)
                return NotFound(new
                {
                    message = "Claim not found"
                });

            return Ok(claim);
        }

        // View Claim Status
        [HttpGet("claimstatus/{id}")]
        public async Task<IActionResult> ClaimStatus(int id)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

            var claim = await _context.Claims
                .FirstOrDefaultAsync(c => c.Id == id && c.UserId == userId);

            if (claim == null)
                return NotFound(new
                {
                    message = "Claim not found"
                });

            return Ok(new
            {
                claim.Id,
                claim.PolicyNumber,
                claim.ClaimType,
                claim.Amount,
                claim.Status,
                claim.SubmittedDate
            });
        }

        // View Available Policies
        [HttpGet("policies")]
        public async Task<IActionResult> GetPolicies()
        {
            var policies = await _context.Policies.ToListAsync();

            return Ok(policies);
        }
    }
}