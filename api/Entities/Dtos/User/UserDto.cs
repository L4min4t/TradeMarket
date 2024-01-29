using System.Text.Json.Serialization;

namespace Entities.Dtos.User;

public class UserDto : UserBaseDto
{
    public string Name { get; set; } = null!;
    
    public string? AvatarId { get; set; }
    
    public string? Email { get; set; }
    public string? Phone { get; set; }
    public string? Telegram { get; set; }
    
    public Guid? CityId { get; set; }
}