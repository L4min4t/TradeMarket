using System.ComponentModel.DataAnnotations;
using Entities.Models.Application;

namespace Entities.Dtos.Image;

using Microsoft.AspNetCore.Http;

public class UploadImageModel : IEntity
{
    [Required] public IFormFile ImageFile { get; set; }
    [Required] public Guid Id { get; set; }
}