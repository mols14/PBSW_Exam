namespace UserService.Core.Entities;

public class User
{
    public int Id { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string Role { get; set; } = "User";
    //add upgrades[]
    //add totalScore
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
}