using System.Text.Json.Serialization;

namespace Entities.Dtos.City;

public class CityCreateDto : CityBaseDto
{
    [JsonIgnore]
    public new Guid Id { get; set; } 
    public required string Name { get; set; } = null!;
    public required string Region { get; set; } = null!;
    public required string Status { get; set; } = null!;
}