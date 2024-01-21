namespace Entities.Models.Application;

public class User
{
    public Guid UserId { get; set; } = Guid.NewGuid();

    public string Name { get; set; } = null!;
    public string? AvatarUrl { get; set; }
    
    public string? Email { get; set; }
    public string? Phone { get; set; }
    public string? Telegram { get; set; }
    
    public Guid? CityId { get; set; }
    public City? City { get; set; }
}