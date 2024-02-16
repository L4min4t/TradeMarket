using Entities.Dtos.Image;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;
using TradeMarket.Attributes;

namespace TradeMarket.Controllers;

[ApiController]
[Route("[controller]")]
[Authorize]
public class ImageController : ControllerBase
{
    private readonly IImageService _service;

    public ImageController(IImageService service)
    {
        _service = service;
    }

    [HttpPost]
    public async Task<IActionResult> UploadImage([FromForm] UploadImageModel param)
    {
        var result = await _service.UploadAsync(param);
        return result.IsSuccess ? Ok(result.Message) : BadRequest(result.Message);
    }
    
    [HttpGet("{id}")]
    public async Task<IActionResult> GetImage(string id)
    {
        var result = await _service.GetImageAsync(id);
        return result.IsSuccess ? result.Value : NotFound(result.Message);
    }
    
    [HttpDelete("{id}")]
    [CustomCheckAccess("manage-image")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var result = await _service.DeleteImageAsync(id);
        return result.IsSuccess ? Ok(result.Message) : NotFound(result.Message);
    }
}