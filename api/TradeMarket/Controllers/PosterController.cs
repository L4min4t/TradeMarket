using Entities.Dtos.Poster;
using Entities.Models.Poster;
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

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] PosterCreateDto dto)
    {
        var result = await _service.CreateAsync(dto);
        return result.IsSuccess ? Ok(result.Value) : BadRequest(result.Message);
    }
    
    [HttpPut]
    public async Task<IActionResult> Update([FromBody] PosterUpdateDto dto)
    {
        var result = await _service.UpdateAsync(dto);
        return result.IsSuccess ? Ok(result.Value) : BadRequest(result.Message);
    }

    [HttpGet("published")]
    public async Task<IActionResult> GetPubliched()
    {
        var result = await _service.FindByConditionAsync(p => p.IsActive == true && p.IsModerated == true);
        return result.IsSuccess ? Ok(result.Value) : NotFound(result.Message);
    }

    [HttpGet("to-moderate")]
    public async Task<IActionResult> GetPostersToModerate()
    {
        var result = await _service.FindByConditionAsync(p => p.IsModerated == false && p.IsActive == true);
        return result.IsSuccess ? Ok(result.Value) : NotFound(result.Message);
    }

    [HttpPut("moderate")]
    public async Task<IActionResult> Moderate([FromBody] ModeratePosterModel model)

    {
        var result = await _service.ModerateAsync(model);
        return result.IsSuccess ? Ok(result.Value) : BadRequest(result.Message);
    }

    [HttpPut("change-status")]
    public async Task<IActionResult> ChangeStatus([FromBody] ActivateDeactivatePosterModel model)
    {
        var result = await _service.ChangeStatusAsync(model);
        return result.IsSuccess ? Ok(result.Value) : BadRequest(result.Message);
    }

    [HttpPut("like")]
    public async Task<IActionResult> Like([FromBody] LikePosterModel model)
    {
        var result = await _service.LikeAsync(model);
        return result.IsSuccess ? Ok(result.Message) : BadRequest(result.Message);
    }
}