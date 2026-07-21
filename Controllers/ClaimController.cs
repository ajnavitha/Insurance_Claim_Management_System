using InsuranceAPI.Data;
using InsuranceAPI.DTOs;
using InsuranceAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using InsuranceClaim = InsuranceAPI.Models.Claim;

namespace InsuranceAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ClaimController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ClaimController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Customer submits a claim
        [Authorize(Roles = "Customer")]
        [HttpPost]
        public async Task<IActionResult> SubmitClaim(ClaimDto dto)
        {
            var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value
                              ?? User.FindFirst("sub")?.Value;

            if (string.IsNullOrEmpty(userIdClaim))
            {
                return Unauthorized("User not found.");
            }

            var claim = new InsuranceClaim
            {
                UserId = int.Parse(userIdClaim),
                PolicyNumber = dto.PolicyNumber,
                ClaimType = dto.ClaimType,
                Amount = dto.Amount,
                Description = dto.Description,
                DocumentPath = dto.DocumentPath,
                SubmittedDate = DateTime.Now,
                Status = "Pending"
            };

            _context.Claims.Add(claim);
            await _context.SaveChangesAsync();

            // Create Notification
            _context.Notifications.Add(new Notification
            {
                UserId = claim.UserId,
                Title = "Claim Submitted",
                Message = $"Your claim for Policy {claim.PolicyNumber} has been submitted successfully.",
                CreatedAt = DateTime.Now,
                IsRead = false
            });

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Claim submitted successfully",
                claim
            });
        }

        // View all claims (Secure: Admin sees all, Customer sees their own)
        [HttpGet]
        public async Task<IActionResult> GetClaims()
        {
            var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value
                              ?? User.FindFirst("sub")?.Value;

            if (string.IsNullOrEmpty(userIdClaim))
            {
                return Unauthorized("User not found.");
            }

            int userId = int.Parse(userIdClaim);
            var isRoleClaim = User.FindFirst(System.Security.Claims.ClaimTypes.Role)?.Value
                              ?? User.FindFirst("role")?.Value;

            if (isRoleClaim == "Admin")
            {
                var claims = await _context.Claims.ToListAsync();
                return Ok(claims);
            }
            else
            {
                var claims = await _context.Claims.Where(c => c.UserId == userId).ToListAsync();
                return Ok(claims);
            }
        }

        // View claim by id
        [HttpGet("{id}")]
        public async Task<IActionResult> GetClaim(int id)
        {
            var claim = await _context.Claims.FindAsync(id);

            if (claim == null)
                return NotFound();

            return Ok(claim);
        }

        // Update status
        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStatus(int id, [FromQuery] string status)
        {
            var claim = await _context.Claims.FindAsync(id);

            if (claim == null)
                return NotFound();

            claim.Status = status;

            await _context.SaveChangesAsync();

            return Ok(claim);
        }

        // Delete claim
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteClaim(int id)
        {
            var claim = await _context.Claims.FindAsync(id);

            if (claim == null)
                return NotFound();

            _context.Claims.Remove(claim);

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Claim deleted successfully"
            });
        }
    }
}