using Entities.Models.Auth;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;

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
    public async Task<IActionResult> Register([FromBody] RegisterModel model)
    {
        var result = await _service.RegisterUserAsync(model);
        return result.IsSuccess ? Ok(new {model.Email, model.Password}) : BadRequest(result.Message);
    }

    [HttpPost("[action]")]
    public async Task<IActionResult> Login([FromBody] LoginModel model)
    {
        var result = await _service.LoginUserAsync(model);
        return result.IsSuccess ? Ok(result.Value) : BadRequest(result.Message);
    }

    [HttpPost("change-password")]
    public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordModel model)
    {
        var result = await _service.ChangePasswordAsync(model);
        return result.IsSuccess ? Ok(result.Value) : BadRequest(result.Message);
    }
}