using Entities.Dtos.City;
using Entities.Models.Application;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;

namespace TradeMarket.Controllers;

[ApiController]
[Route("[controller]")]
public class CityController : ControllerBase
{
    private readonly ICityService _service;

    public CityController(ICityService service)
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

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CityCreateDto createDto)
    {
        var result = await _service.CreateAsync(createDto);
        return result.IsSuccess ? Ok(result.Message) : NotFound(result.Message);
    }
    
    [HttpPut]
    public async Task<IActionResult> Update([FromBody] CityUpdateDto createDto)
    {
        var result = await _service.UpdateAsync(createDto);
        return result.IsSuccess ? Ok(result.Message) : NotFound(result.Message);
    }
}