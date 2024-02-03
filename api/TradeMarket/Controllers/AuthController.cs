﻿using Entities.Models.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;
using TradeMarket.Attributes;

namespace TradeMarket.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _service;

    public AuthController(IAuthService service)
    {
        _service = service;
    }

    [HttpPost("[action]")]
    public async Task<IActionResult> Register([FromBody] RegisterModel param)
    {
        var result = await _service.RegisterUserAsync(param);
        return result.IsSuccess ? Ok(new {param.Email, param.Password}) : BadRequest(result.Message);
    }

    [HttpPost("[action]")]
    public async Task<IActionResult> Login([FromBody] LoginModel param)
    {
        var result = await _service.LoginUserAsync(param);
        return result.IsSuccess ? Ok(result.Value) : BadRequest(result.Message);
    }

    [HttpPost("change-password")]
    [Authorize]
    [CustomCheckAccess("manage-password")]
    public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordModel param)
    {
        var result = await _service.ChangePasswordAsync(param);
        return result.IsSuccess ? Ok(result.Value) : BadRequest(result.Message);
    }
}