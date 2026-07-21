using InsuranceAPI.Data;
using Microsoft.AspNetCore.Mvc;

namespace InsuranceAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DataController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DataController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("test")]
        public IActionResult TestConnection()
        {
            if (_context.Database.CanConnect())
            {
                return Ok("Database Connected Successfully!");
            }

            return BadRequest("Database Connection Failed!");
        }
    }
}