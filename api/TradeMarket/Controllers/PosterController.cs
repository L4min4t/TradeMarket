using Entities.Dtos.Poster;
using Entities.Models.Poster;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Repositories.Interfaces;
using Services.Interfaces;
using TradeMarket.Attributes;

namespace TradeMarket.Controllers;

[ApiController]
[Route("[controller]")]
[Authorize]
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
    
    [HttpGet("user")]
    public async Task<IActionResult> GetUserPosters()
    {
        var result = await _service.GetUserPosters();
        return result.IsSuccess ? Ok(result.Value) : NotFound(result.Message);
    }

    [HttpDelete("{id}")]
    [CustomCheckAccess("manage-poster")]
    public async Task<IActionResult> Delete([FromRoute] Guid id)
    {
        var result = await _service.DeleteAsync(id);
        return result.IsSuccess ? Ok(result.Message) : NotFound(result.Message);
    }
    
    [HttpPut]
    [CustomCheckAccess("manage-poster")]
    public async Task<IActionResult> Update([FromBody] PosterUpdateDto param)
    {
        var result = await _service.UpdateAsync(param);
        return result.IsSuccess ? Ok(result.Value) : BadRequest(result.Message);
    }
    
    [HttpPut("change-status")]
    [CustomCheckAccess("manage-poster")]
    public async Task<IActionResult> ChangeStatus([FromBody] ActivateDeactivatePosterModel param)
    {
        var result = await _service.ChangeStatusAsync(param);
        return result.IsSuccess ? Ok(result.Value) : BadRequest(result.Message);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] PosterCreateDto param)
    {
        var result = await _service.CreateAsync(param);
        return result.IsSuccess ? Ok(result.Value) : BadRequest(result.Message);
    }

    [HttpGet("published")]
    public async Task<IActionResult> GetPublished()
    {
        var result = await _service.FindByConditionAsync(p => p.IsActive == true && p.IsModerated == true);
        return result.IsSuccess ? Ok(result.Value) : NotFound(result.Message);
    }

    [HttpGet("to-moderate")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetPostersToModerate()
    {
        var result = await _service.FindByConditionAsync(p => p.IsModerated == false && p.IsActive == true);
        return result.IsSuccess ? Ok(result.Value) : NotFound(result.Message);
    }

    [HttpPut("moderate")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Moderate([FromBody] ModeratePosterModel param)

    {
        var result = await _service.ModerateAsync(param);
        return result.IsSuccess ? Ok(result.Value) : BadRequest(result.Message);
    }

    [HttpPut("like/{id}")]
    public async Task<IActionResult> Like([FromRoute] Guid id)
    {
        var result = await _service.LikeAsync(id);
        return result.IsSuccess ? Ok() : BadRequest(result.Message);
    }
    
    [HttpPut("view/{id}")]
    public async Task<IActionResult> View([FromRoute] Guid id)
    {
        var result = await _service.ViewAsync(id);
        return result.IsSuccess ? Ok() : BadRequest(result.Message);
    }
    
    [HttpGet("liked/{id}")]
    public async Task<IActionResult> GetLiked([FromRoute] Guid id)
    {
        var result = await _service.GetLikedAsync();
        return result.IsSuccess ? Ok(result.Value) : BadRequest(result.Message);
    }
}