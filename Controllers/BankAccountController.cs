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
    public class BankAccountController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BankAccountController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetBankAccount()
        {
            var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirst("sub")?.Value;
            if (string.IsNullOrEmpty(userIdStr)) return Unauthorized();
            int userId = int.Parse(userIdStr);

            var bank = await _context.BankAccounts.FirstOrDefaultAsync(b => b.UserId == userId);
            if (bank == null)
            {
                // Create mock default bank account if none exists
                bank = new BankAccount
                {
                    UserId = userId,
                    BankName = "HDFC Bank Ltd.",
                    AccountHolder = User.Identity?.Name ?? "Policyholder",
                    AccountNumber = "•••• •••• 9842",
                    Balance = 158500.00m,
                    AvailableBalance = 145000.00m,
                    AutoDebitEnabled = true
                };
                _context.BankAccounts.Add(bank);
                await _context.SaveChangesAsync();
            }

            return Ok(bank);
        }

        [HttpPost("link")]
        public async Task<IActionResult> LinkBankAccount([FromBody] BankAccount model)
        {
            var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirst("sub")?.Value;
            if (string.IsNullOrEmpty(userIdStr)) return Unauthorized();
            int userId = int.Parse(userIdStr);

            var existing = await _context.BankAccounts.FirstOrDefaultAsync(b => b.UserId == userId);
            if (existing != null)
            {
                existing.BankName = model.BankName;
                existing.AccountHolder = model.AccountHolder;
                // Mask the account number for security
                existing.AccountNumber = MaskAccountNumber(model.AccountNumber);
                existing.Balance = model.Balance > 0 ? model.Balance : 100000.00m;
                existing.AvailableBalance = existing.Balance * 0.9m;
            }
            else
            {
                model.UserId = userId;
                model.AccountNumber = MaskAccountNumber(model.AccountNumber);
                model.Balance = model.Balance > 0 ? model.Balance : 100000.00m;
                model.AvailableBalance = model.Balance * 0.9m;
                _context.BankAccounts.Add(model);
            }

            await _context.SaveChangesAsync();
            return Ok(new { message = "Bank account securely linked.", account = existing ?? model });
        }

        [HttpPut("toggle-autodebit")]
        public async Task<IActionResult> ToggleAutoDebit()
        {
            var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirst("sub")?.Value;
            if (string.IsNullOrEmpty(userIdStr)) return Unauthorized();
            int userId = int.Parse(userIdStr);

            var bank = await _context.BankAccounts.FirstOrDefaultAsync(b => b.UserId == userId);
            if (bank == null) return NotFound("Bank account not linked.");

            bank.AutoDebitEnabled = !bank.AutoDebitEnabled;
            await _context.SaveChangesAsync();

            return Ok(new { message = $"Auto-debit status updated to {bank.AutoDebitEnabled}", autoDebit = bank.AutoDebitEnabled });
        }

        private string MaskAccountNumber(string accNum)
        {
            if (string.IsNullOrEmpty(accNum) || accNum.Length < 4) return "•••• •••• 1234";
            var last4 = accNum.Substring(accNum.Length - 4);
            return $"•••• •••• {last4}";
        }
    }
}
