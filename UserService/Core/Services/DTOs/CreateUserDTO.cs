using UserService.Core.Entities;

namespace UserService.Core.Services.DTOs;

public class CreateUserDTO
{
    public string Username { get; set; }
    public string Password { get; set; }
    public string Email { get; set; }
    public List<Upgrade> Upgrades { get; set; }
    public int Totalscore { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;
}