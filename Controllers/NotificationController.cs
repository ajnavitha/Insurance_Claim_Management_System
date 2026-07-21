using InsuranceAPI.Data;
using InsuranceAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InsuranceAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class NotificationController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public NotificationController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Get all notifications
        [HttpGet]
        public async Task<IActionResult> GetNotifications()
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
                var notifications = await _context.Notifications
                    .OrderByDescending(n => n.CreatedAt)
                    .ToListAsync();
                return Ok(notifications);
            }
            else
            {
                var notifications = await _context.Notifications
                    .Where(n => n.UserId == userId)
                    .OrderByDescending(n => n.CreatedAt)
                    .ToListAsync();
                return Ok(notifications);
            }
        }

        // Create notification
        [HttpPost]
        public async Task<IActionResult> CreateNotification(Notification notification)
        {
            notification.CreatedAt = DateTime.Now;
            notification.IsRead = false;

            _context.Notifications.Add(notification);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Notification created successfully.",
                notification
            });
        }

        // Mark notification as read
        [HttpPut("read/{id}")]
        public async Task<IActionResult> MarkAsRead(int id)
        {
            var notification = await _context.Notifications.FindAsync(id);

            if (notification == null)
            {
                return NotFound(new
                {
                    message = "Notification not found."
                });
            }

            notification.IsRead = true;

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Notification marked as read."
            });
        }

        // Delete notification
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNotification(int id)
        {
            var notification = await _context.Notifications.FindAsync(id);

            if (notification == null)
            {
                return NotFound(new
                {
                    message = "Notification not found."
                });
            }

            _context.Notifications.Remove(notification);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Notification deleted successfully."
            });
        }
    }
}