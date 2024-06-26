﻿namespace AuthorisationService.Core.Services;

public class CreateAuthorisationDto
{
    public string Email { get; set; }
    public string Password  { get; set; }
    public string Username { get; set; }
    public string? Salt { get; set; }
    public int Totalscore { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public int AuthorisationId { get; set; }
}