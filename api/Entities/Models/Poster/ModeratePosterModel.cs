using System.ComponentModel.DataAnnotations;

namespace Entities.Models.Poster;

public class ModeratePosterModel
{
    [Required] public Guid PosterId { get; set; }
    [Required] public bool ModerateResult { get; set; }
    [Required]public bool IsActivated { get; set; }
}