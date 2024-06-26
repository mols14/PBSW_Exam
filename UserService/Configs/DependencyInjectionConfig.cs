﻿using EasyNetQ;
using Messaging;
using Microsoft.EntityFrameworkCore;
using UserService.Core.Services;
using UserService.MessageHandler;
using UserService.Core.Repositories;
using UserService.Core.Repositories.Interfaces;
using UserService.Core.Services.Interfaces;

namespace UserService.Configs;

public static class DependencyInjectionConfig
{
    public static void ConfigureDi(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddSingleton(new MessageClient(RabbitHutch.CreateBus("host=rabbitmq;port=5672;virtualHost=/;username=guest;password=guest")));
        services.AddDbContext<DatabaseContext>(options =>
        {
            options.UseSqlServer("Server=user-db;Database=userDb;User Id=SA;Password=uhohst1nky!;Trusted_Connection=False;TrustServerCertificate=True;");
        });
        
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IUserService, UserService.Core.Services.UserService>();
        services.AddSingleton(AutoMapperConfig.ConfigureAutoMapper());
        services.AddHostedService<CreateUserHandler>();
    }
}