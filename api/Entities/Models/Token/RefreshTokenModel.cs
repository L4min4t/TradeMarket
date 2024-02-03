﻿using System.ComponentModel.DataAnnotations;

namespace Entities.Models.Token;

public class RefreshTokenModel : TokenModel
{
    [Required] public string Email { get; set; }
}