using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace CopilotCompany.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UsersController : ControllerBase
    {
        private static List<User> PendingUsers = new List<User>();

        [HttpPost("register")]
        public IActionResult Register([FromBody] User user)
        {
            user.Status = "Pending";
            PendingUsers.Add(user);
            return Ok(new { message = "Registration submitted for approval." });
        }

        [HttpGet("pending")]
        public IActionResult GetPendingUsers()
        {
            return Ok(PendingUsers.FindAll(u => u.Status == "Pending"));
        }

        [HttpPost("approve")]
        public IActionResult ApproveUser([FromBody] string email)
        {
            var user = PendingUsers.Find(u => u.Email == email);
            if (user != null)
            {
                user.Status = "Approved";
                return Ok(new { message = "User approved." });
            }
            return NotFound(new { message = "User not found." });
        }

        [HttpPost("reject")]
        public IActionResult RejectUser([FromBody] string email)
        {
            var user = PendingUsers.Find(u => u.Email == email);
            if (user != null)
            {
                user.Status = "Rejected";
                return Ok(new { message = "User rejected." });
            }
            return NotFound(new { message = "User not found." });
        }
    }

    public class User
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Status { get; set; }
    }
}
