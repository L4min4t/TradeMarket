namespace Entities.Models.Application;

public class User : IEntity
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public string IdentityId { get; set; }

    public string Name { get; set; } = null!;
    public string? AvatarId { get; set; }
    
    public string Email { get; set; }
    public string? Phone { get; set; }
    public string? Telegram { get; set; }
    
    public Guid? CityId { get; set; }
    public City? City { get; set; }

    public List<UserLikedPoster>? LikedPosters { get; set; }
}