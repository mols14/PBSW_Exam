﻿namespace Messaging.Messages;

public class CreateUser
{
    public string Message { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string Role { get; set; } = "User";
    public int Totalscore { get; set; }
    public DateTime CreatedAt { get; set; }

    // Foreign key for Authorisation
    public int AuthorisationId { get; set; }

    public CreateUser(string message, string username, string email, string password,
        int totalscore, DateTime createdAt, int authorisationId, string role = "User")
    {
        Message = message;
        Username = username;
        Email = email;
        Password = password;
        Totalscore = totalscore;
        CreatedAt = createdAt;
        AuthorisationId = authorisationId;
        Role = role;
    }
}