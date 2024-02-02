using Entities.Models.Token;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;
using Services.Services;

namespace TradeMarket.Controllers;

[ApiController]
[Route("[controller]")]
public class JwtController : ControllerBase
{
    private readonly IJwtService _service;

    public JwtController(IJwtService service)
    {
        _service = service;
    }

    [HttpPost]
    public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenModel model)
    {
        var result = await _service.RefreshTokenAsync(model);
        return result.IsSuccess ? Ok(result.Value) : BadRequest(result.Message);
    }
}