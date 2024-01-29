using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Entities.Dtos.City;

public class CityCreateDto : CityBaseDto
{
    [JsonIgnore]
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