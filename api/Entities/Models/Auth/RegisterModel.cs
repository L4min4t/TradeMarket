using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Entities.Models.Auth;

public class RegisterModel
{
    [Required]
    [StringLength(32, MinimumLength = 3)]
    public string Name { get; set; }

    [Required] [EmailAddress] public string Email { get; set; }

    [Required]
    [DataType(DataType.Password)]
    public string Password { get; set; }
}