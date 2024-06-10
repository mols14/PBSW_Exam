using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using AuthorisationService.Core.Entities;
using AuthorisationService.Core.Services;
using Microsoft.AspNetCore.Mvc;
using Monitoring;
using Polly;

namespace AuthorisationService.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthorisationController : ControllerBase
{
    private readonly IAuthorisationService _authorisationService;
    private readonly HttpClient _httpClient;

    public AuthorisationController(IAuthorisationService authorisationService, HttpClient httpClient)
    {
        _authorisationService = authorisationService;
        _httpClient = httpClient;
    }

    [HttpPost("register")]
public async Task<IActionResult> Register([FromBody] CreateAuthorisationDto createAuthorisationDto)
{
    try
    {
        var authorisation = await _authorisationService.Register(createAuthorisationDto);
        if (authorisation == null)
        {
            return BadRequest("Registration failed");
        }

        // Create user in UserService
        var userDto = new CreateUserDTO
        {
            Username = createAuthorisationDto.Username,
            Email = createAuthorisationDto.Email,
            Password = createAuthorisationDto.Password,
            Upgrades = new List<Upgrade>
            {
                
            },
            Totalscore = 0,
            CreatedAt = DateTime.UtcNow,
            AuthorisationId = authorisation.Id
        };

        // Log the payload
        Console.WriteLine("Sending payload to UserService: " + JsonSerializer.Serialize(userDto));

        // Define the retry policy using Polly
        var retryPolicy = Policy
            .Handle<HttpRequestException>()
            .OrResult<HttpResponseMessage>(r => !r.IsSuccessStatusCode)
            .RetryAsync(3, onRetry: (outcome, retryCount, context) =>
            {
                Logging.Log.Error($"Failed to connect to UserService. Retrying... Attempt {retryCount}");
                Console.WriteLine($"Failed due to {outcome.Exception?.Message ?? outcome.Result.ReasonPhrase}. " +
                                  $"Retrying... Attempt {retryCount}");
            });

        // Execute the HTTP call with the retry policy
        var response = await retryPolicy.ExecuteAsync(() =>
            _httpClient.PostAsJsonAsync("http://userservice:80/api/User/AddUser", userDto)
        );

        if (response.IsSuccessStatusCode)
        {
            return Ok(authorisation);
        }
        else
        {
            // Log response error details
            var responseBody = await response.Content.ReadAsStringAsync();
            Console.WriteLine("UserService response error: " + response.ReasonPhrase);
            Console.WriteLine("UserService response body: " + responseBody);
            return StatusCode(500, "User creation failed");
        }
    }
    catch (Exception ex)
    {
        Console.WriteLine("Exception in Register method: " + ex.Message);
        return StatusCode(500, ex.Message);
    }
}

    [HttpPost("Login")]
    public async Task<IActionResult> Login([FromBody] LoginDto dto)
    {
        try
        {
            var token = await _authorisationService.Login(dto);
            return Ok(new { token });
        }
        catch (Exception e)
        {
            return Unauthorized(new { error = e.Message });
        }
    }

    [HttpGet]
    [Route("ValidateToken")]
    public async Task<bool> ValidateToken()
    {
        try
        {
            var re = Request;

            if (!re.Headers.ContainsKey("Authorization"))
                return await Task.Run(() => false);

            if (!re.Headers["Authorization"].ToString().StartsWith("Bearer "))
                return await Task.Run(() => false);

            
            var token = re.Headers["Authorization"].ToString().Replace("Bearer ", "");
            var result = await _authorisationService.ValidateToken(token);
            return result.Succeeded;
        }
        catch (Exception e)
        {
            return await Task.Run(() => false);
        }
    }
}