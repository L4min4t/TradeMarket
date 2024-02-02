﻿using System.ComponentModel.DataAnnotations;

namespace Entities.Models.Token;

public class TokenModel
{
    [Required] public string AccessToken { get; set; }
    [Required] public string RefreshToken { get; set; }
}