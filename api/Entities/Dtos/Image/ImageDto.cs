﻿using Entities.Models.Application;

namespace Entities.Dtos.Image;
using Microsoft.AspNetCore.Http;

public class ImageDto : IEntity
{
    public IFormFile ImageFile { get; set; }
    public Guid Id { get; set; }
}