using Entities.Dtos.User;
using Entities.Models.Application;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;
using TradeMarket.Attributes;

namespace TradeMarket.Controllers;

[ApiController]
[Route("[controller]")]
[Authorize]
public class UserController : ControllerBase
{
    private readonly IUserService _service;

    public UserController(IUserService service)
    {
        _service = service;
    }

    [HttpGet]
    [Authorize(Roles = "Admin")]
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
    [CustomCheckAccess("manage-user")]
    public async Task<IActionResult> Delete([FromRoute] Guid id)
    {
        var result = await _service.DeleteAsync(id);
        return result.IsSuccess ? Ok("Success!") : NotFound(result.Message);
    }

    [HttpPut]
    [CustomCheckAccess("manage-user")]
    public async Task<IActionResult> Update([FromBody] UserUpdateDto param)
    {
        var result = await _service.UpdateAsync(param);
        return result.IsSuccess ? Ok("Success!") : NotFound(result.Message);
    }
}