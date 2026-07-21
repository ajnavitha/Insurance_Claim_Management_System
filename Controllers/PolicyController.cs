using InsuranceAPI.Data;
using InsuranceAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InsuranceAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PolicyController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PolicyController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Admin creates policy
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> AddPolicy(Policy policy)
        {
            _context.Policies.Add(policy);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Policy added successfully",
                policy
            });
        }

        // Everyone can view policies
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetPolicies()
        {
            return Ok(await _context.Policies.ToListAsync());
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPolicy(int id)
        {
            var policy = await _context.Policies.FindAsync(id);

            if (policy == null)
                return NotFound();

            return Ok(policy);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePolicy(int id, Policy policy)
        {
            if (id != policy.Id)
                return BadRequest();

            _context.Entry(policy).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(policy);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePolicy(int id)
        {
            var policy = await _context.Policies.FindAsync(id);

            if (policy == null)
                return NotFound();

            _context.Policies.Remove(policy);
            await _context.SaveChangesAsync();

            return Ok("Policy deleted successfully");
        }
    }
}