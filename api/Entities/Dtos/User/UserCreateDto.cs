using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Entities.Dtos.User;

public class UserCreateDto : UserBaseDto
{
    [Required] public override Guid Id { get; set; }

    [Required]
    [StringLength(255, MinimumLength = 2)]
    public string Name { get; set; }

    [Required]
    [StringLength(255, MinimumLength = 2)]
    public string Email { get; set; }
}