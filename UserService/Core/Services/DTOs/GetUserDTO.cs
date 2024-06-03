using UserService.Core.Entities;

namespace UserService.Core.Services.DTOs;

public class GetUserDTO
{
    public int Id { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public List<Upgrade> Upgrades { get; set; }
    public int Totalscore { get; set; }
    public DateTime CreatedAt { get; set; }
}