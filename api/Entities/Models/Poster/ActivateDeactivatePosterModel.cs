using System.ComponentModel.DataAnnotations;

namespace Entities.Models.Poster;

public class ActivateDeactivatePosterModel
{
    [Required] public Guid PosterId { get; set; }
    [Required] public bool Status { get; set; }
}