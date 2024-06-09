using AuthorisationService.Core.Helper;
using AuthorisationService.Core.Entities;
using AuthorisationService.Core.Repositories;
using Microsoft.EntityFrameworkCore;
using Monitoring;
using OpenTelemetry.Trace;

namespace AuthorisationService.Core.Repositories;

public class AuthorisationRepository : IAuthorisationRepository
{
    private readonly DatabaseContext _context;
    private Tracer _tracer;

    public AuthorisationRepository(DatabaseContext context, Tracer tracer)
    {
        _context = context;
        _tracer = tracer;
    }


    public async Task Register(Authorisation authorisation)
    {
        
        using var activity = _tracer.StartActiveSpan("UserRegistered");
        
        Logging.Log.Information("UserRegistered");
        
        await _context.Authorisations.AddAsync(authorisation);
        await _context.SaveChangesAsync();
    }

    public async Task<Authorisation> GetAuthorisationById(int authorisationId)
    {
        var authorisation = await _context.Authorisations.FirstOrDefaultAsync(a => a.Id == authorisationId);

        if (authorisation is null) throw new ArgumentException($"No authorisation of {authorisationId}");

        return authorisation;
    }

    public async Task<Authorisation> GetAuthorisationByEmail(string email)
    {
        
        using var activity = _tracer.StartActiveSpan("UserLoggedIn");
        
        Logging.Log.Information("UserLoggedIn");
        
        var authorisation = await _context.Authorisations.FirstOrDefaultAsync(a => a.Email == email);

        if (authorisation is null) throw new ArgumentException($"No email of {email}");

        return authorisation;
    }

    public async Task DeleteAuthorisation(int authorisationId)
    {
        var authorisation = await GetAuthorisationById(authorisationId);
        if (authorisation is null) throw new ArgumentException($"No Authorisation of {authorisationId}");
        _context.Authorisations.Remove(authorisation);
        await _context.SaveChangesAsync();
    }

    public async Task<bool> DoesAuthorisationExists(string email)
    {
        var authorisation = await _context.Authorisations.FirstOrDefaultAsync(a => a.Email == email);
        if (authorisation != null || authorisation != default)
        {
            return true;
        }

        return false;
    }
}