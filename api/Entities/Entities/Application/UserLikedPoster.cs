namespace Entities.Models.Application;

public class UserLikedPoster
{
    public Guid UserId { get; set; }
    public User User { get; set; }
    
    public Guid PosterId { get; set; }
    public Poster Poster { get; set; }
}