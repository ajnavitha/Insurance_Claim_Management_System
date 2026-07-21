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
    [Authorize]
    public class SupportController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public SupportController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Customer - Create Ticket
        [HttpPost]
        public async Task<IActionResult> CreateTicket(SupportTicket ticket)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ??
                                   User.FindFirst("sub")?.Value!);

            ticket.UserId = userId;
            ticket.Status = "Open";
            ticket.CreatedAt = DateTime.Now;

            _context.SupportTickets.Add(ticket);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Support ticket created successfully.",
                ticket
            });
        }

        // Customer - View My Tickets
        [HttpGet("my")]
        public async Task<IActionResult> MyTickets()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ??
                                   User.FindFirst("sub")?.Value!);

            var tickets = await _context.SupportTickets
                .Where(t => t.UserId == userId)
                .OrderByDescending(t => t.CreatedAt)
                .ToListAsync();

            return Ok(tickets);
        }

        // Admin - View All Tickets
        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<IActionResult> GetAllTickets()
        {
            return Ok(await _context.SupportTickets
                .OrderByDescending(t => t.CreatedAt)
                .ToListAsync());
        }

        // Admin - Close Ticket
        [Authorize(Roles = "Admin")]
        [HttpPut("close/{id}")]
        public async Task<IActionResult> CloseTicket(int id)
        {
            var ticket = await _context.SupportTickets.FindAsync(id);

            if (ticket == null)
                return NotFound("Ticket not found.");

            ticket.Status = "Closed";

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Ticket closed successfully."
            });
        }
    }
}