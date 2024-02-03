using System.ComponentModel.DataAnnotations;

namespace Entities.Models.Poster;

public class LikePosterModel
{
    [Required] public Guid UserId { get; set; }
    [Required] public Guid PosterId { get; set; }
}