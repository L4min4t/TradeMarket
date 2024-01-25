using Entities.Models.Application;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;

namespace TradeMarket.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserService _service;

    public UserController(IUserService service)
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
    
    // [HttpPost]
    // public async Task<IActionResult> Create([FromBody] User entity)
    // {
    //     var result = await _service.CreateAsync(entity);
    //     return result.IsSuccess ? Ok(result.Message) : NotFound(result.Message);
    // }
}