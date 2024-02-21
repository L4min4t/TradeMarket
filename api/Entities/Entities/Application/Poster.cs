using Constants.Enums;

namespace Entities.Models.Application;

public class Poster : IEntity
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public string Title { get; set; } = null!;
    public string Description { get; set; } = null!;

    public decimal Price { get; set; } = -1;
    public bool IsSharing { get; set; } = false;
    public bool IsNew { get; set; } = true;
    
    public string? ImageId { get; set; }

    public bool IsActive { get; set; } = true;
    public bool IsModerated { get; set; } = false;

    public Guid CreatorId { get; set; }
    public User Creator { get; set; } = null!;
    
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime? PublishedAt { get; set; }

    public uint NumberViewed { get; set; } = 0;
    public uint NumberLiked { get; set; } = 0;
    
    public Category Category { get; set; }
    
    public ICollection<UserLikedPoster> LikedByUsers { get; set; } = new List<UserLikedPoster>();
}