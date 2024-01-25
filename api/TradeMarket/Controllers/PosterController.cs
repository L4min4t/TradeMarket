using Microsoft.AspNetCore.Mvc;
using Repositories.Interfaces;
using Services.Interfaces;

namespace TradeMarket.Controllers;

[ApiController]
[Route("[controller]")]
public class PosterController : ControllerBase
{
    private readonly IPosterService _service;

    public PosterController(IPosterService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var result = await _service.FindAllAsync();
        return result.IsSuccess ? Ok(result.Value) : NotFound(result.Message);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get([FromRoute] Guid id)
    {
        var result = await _service.FindByIdAsync(id);
        return result.IsSuccess ? Ok(result.Value) : NotFound(result.Message);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete([FromRoute] Guid id)
    {
        var result = await _service.DeleteAsync(id);
        return result.IsSuccess ? Ok(result.Message) : NotFound(result.Message);
    }
}