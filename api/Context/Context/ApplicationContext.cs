using Entities.Models.Application;
using Microsoft.EntityFrameworkCore;

namespace Context.Context;

public class ApplicationContext : DbContext
{
    
    public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options) {}
    
    public DbSet<Poster> Posters { get; set; }
    public DbSet<City> Cities { get; set; }
    public DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        ConfigureUser(modelBuilder);
        ConfigureCity(modelBuilder);
        ConfigurePoster(modelBuilder);
    }

    private void ConfigureUser(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId);
            
            entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
            
            entity.Property(e => e.Email).HasMaxLength(255);
            entity.Property(e => e.Phone).HasMaxLength(255);
            entity.Property(e => e.Telegram).HasMaxLength(255);
            
            entity.Property(e => e.AvatarUrl).HasMaxLength(511);
            
            // One-to-many: User-City
            entity.HasOne(u => u.City)
                .WithMany(c => c.Users)
                .HasForeignKey(u => u.CityId)
                .OnDelete(DeleteBehavior.SetNull);
        });
    }

    private void ConfigureCity(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<City>(entity =>
        {
            entity.HasKey(e => e.CityId);
            
            entity.Property(e => e.Name).IsRequired().HasMaxLength(255);
            entity.Property(e => e.Region).IsRequired().HasMaxLength(255);
            entity.Property(e => e.Status).IsRequired().HasMaxLength(100);
        });
    }

    private void ConfigurePoster(ModelBuilder modelBuilder)
    {
        
        modelBuilder.Entity<Poster>(entity =>
        {
            entity.HasKey(e => e.PosterId);
            
            entity.Property(e => e.Title).IsRequired().HasMaxLength(200);
            entity.Property(e => e.Description).IsRequired().HasMaxLength(5000);
            
            entity.Property(e => e.Price).IsRequired();
            entity.Property(e => e.IsSharing).IsRequired();
            entity.Property(e => e.IsNew).IsRequired();
            
            entity.Property(e => e.IsActive).IsRequired();
            entity.Property(e => e.IsModerated).IsRequired();
            
            entity.Property(e => e.CreatedAt).IsRequired();
            
            entity.Property(e => e.NumberViewed).IsRequired();
            entity.Property(e => e.NumberLiked).IsRequired();
            
            entity.Property(e => e.Category).IsRequired();
            
            // One-to-one: User-City
            entity.HasOne(p => p.Creator)
                .WithOne()
                .OnDelete(DeleteBehavior.Cascade);
        });
    }
}