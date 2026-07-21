using InsuranceAPI.Data;
using InsuranceAPI.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InsuranceAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
    public class RecommendationController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public RecommendationController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("{claimId}")]
        public async Task<IActionResult> GetRecommendation(int claimId)
        {
            var claim = await _context.Claims
                .FirstOrDefaultAsync(c => c.Id == claimId);

            if (claim == null)
            {
                return NotFound(new
                {
                    message = "Claim not found"
                });
            }

            var result = new ClaimRecommendationDto
            {
                ClaimId = claim.Id,
                ClaimAmount = claim.Amount
            };

            if (claim.Amount <= 10000)
            {
                result.RiskLevel = "Low";
                result.Recommendation = "Auto Approve";
                result.Reason = "Low-value claim.";
            }
            else if (claim.Amount <= 50000)
            {
                result.RiskLevel = "Medium";
                result.Recommendation = "Manual Review";
                result.Reason = "Medium-value claim requires verification.";
            }
            else
            {
                result.RiskLevel = "High";
                result.Recommendation = "High Risk Investigation";
                result.Reason = "High-value claim requires detailed verification.";
            }

            return Ok(result);
        }
    }
}
