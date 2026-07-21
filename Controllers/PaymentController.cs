using InsuranceAPI.Data;
using InsuranceAPI.DTOs;
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
    public class PaymentController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PaymentController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> MakePayment([FromBody] PaymentRequestDto request)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value
                              ?? User.FindFirst("sub")?.Value;

            if (string.IsNullOrEmpty(userIdClaim))
            {
                return Unauthorized("User not found.");
            }

            var payment = new Payment
            {
                UserId = int.Parse(userIdClaim),
                PolicyNumber = request.PolicyNumber,
                Amount = request.Amount,
                PaymentMethod = request.PaymentMethod,
                Status = "Success",
                PaymentDate = DateTime.Now,
                TransactionId = "TXN" + Guid.NewGuid().ToString("N").Substring(0, 10).ToUpper()
            };

            _context.Payments.Add(payment);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Payment completed successfully.",
                payment
            });
        }

        [HttpGet("history")]
        public async Task<IActionResult> PaymentHistory()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value
                              ?? User.FindFirst("sub")?.Value;

            if (string.IsNullOrEmpty(userIdClaim))
            {
                return Unauthorized("User not found.");
            }

            int userId = int.Parse(userIdClaim);

            var payments = await _context.Payments
                .Where(p => p.UserId == userId)
                .OrderByDescending(p => p.PaymentDate)
                .ToListAsync();

            return Ok(payments);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<IActionResult> GetAllPayments()
        {
            var payments = await _context.Payments
                .OrderByDescending(p => p.PaymentDate)
                .ToListAsync();

            return Ok(payments);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPayment(int id)
        {
            var payment = await _context.Payments.FindAsync(id);

            if (payment == null)
                return NotFound("Payment not found.");

            return Ok(payment);
        }

        [HttpGet("receipt/{id}")]
        public async Task<IActionResult> GetReceipt(int id)
        {
            var payment = await _context.Payments.FindAsync(id);
            if (payment == null) return NotFound("Payment record not found.");

            var user = await _context.Users.FindAsync(payment.UserId);

            return Ok(new
            {
                ReceiptNumber = "RCP-" + payment.Id.ToString("D6"),
                TransactionId = payment.TransactionId,
                CustomerName = user?.Name ?? "Policyholder",
                CustomerEmail = user?.Email ?? "",
                PolicyNumber = payment.PolicyNumber,
                Amount = payment.Amount,
                PaymentMethod = payment.PaymentMethod,
                PaymentDate = payment.PaymentDate.ToString("dd-MMM-yyyy HH:mm"),
                Status = payment.Status,
                GSTAmount = payment.Amount * 0.18m,
                TotalPaid = payment.Amount * 1.18m
            });
        }
    }
}