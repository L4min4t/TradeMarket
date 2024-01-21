namespace Entities.Models.Application;

public class City
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public string Name { get; set; } = null!;
    public string Region { get; set; } = null!;
    public string Status { get; set; } = null!;
    
    public List<User>? Users { get; set; }
}