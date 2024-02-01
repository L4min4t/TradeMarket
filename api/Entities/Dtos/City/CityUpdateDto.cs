using System.ComponentModel.DataAnnotations;

namespace Entities.Dtos.City;

public class CityUpdateDto : CityBaseDto
{
    [Required]
    public override Guid Id { get; set; }
    
    [Required]
    [StringLength(120, MinimumLength = 2)]
    public string Name { get; set; } = null!;
    [Required]
    [StringLength(120, MinimumLength = 2)]
    public string Region { get; set; } = null!;
    [Required]
    [StringLength(120, MinimumLength = 2)]
    public string Status { get; set; } = null!;
}