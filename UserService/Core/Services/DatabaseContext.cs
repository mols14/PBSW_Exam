﻿using Microsoft.EntityFrameworkCore;
using UserService.Core.Entities;

namespace UserService.Core.Services;

public class DatabaseContext : DbContext
{
    public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
    {}
    
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer("Server=localhost;Database=userDb;User Id=SA;Password=uhohst1nky!;Trusted_Connection=False;TrustServerCertificate=True;");
    }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>().Property(u => u.Id).ValueGeneratedOnAdd();
        modelBuilder.Entity<User>().HasIndex(u => u.Email).IsUnique();
        modelBuilder.Entity<User>().HasIndex(u => u.Username).IsUnique();
    }
    
    public DbSet<User> Users { get; set; }
    
}