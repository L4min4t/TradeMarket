namespace Entities.Dtos.City;

public class CityUpdateDto : CityBaseDto
{
    public required string Name { get; set; } = null!;
    public required string Region { get; set; } = null!;
    public required string Status { get; set; } = null!;
}