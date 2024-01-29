using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Constants.Enums;

namespace Entities.Dtos.Poster;

public class PosterUpdateDto : PosterBaseDto
{
    [Required]
    public override Guid Id { get; set; }

    [Required]
    [StringLength(255, MinimumLength = 4)]
    public  string Title { get; set; }
    [Required]
    [StringLength(4095, MinimumLength = 20)]
    public  string Description { get; set; }
    
    [Required]
    [Range(-1, 999_999_999)]
    public decimal Price { get; set; }
    [Required]
    public  bool IsSharing { get; set; } = false;
    [Required]
    public  bool IsNew { get; set; } = true;

    public string? ImageId { get; set; }

    [JsonIgnore]
    public bool IsActive { get; set; } = false;
    [JsonIgnore]
    public bool IsModerated { get; set; } = false;

    [Required]
    public Guid CreatorId { get; set; }
    
    [Required]
    public uint NumberViewed { get; set; }
    [Required]
    public uint NumberLiked { get; set; }
    
    [Required]
    public Category Category { get; set; }
}