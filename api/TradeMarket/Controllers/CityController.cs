using Microsoft.AspNetCore.Mvc;
using Repositories.Interfaces;

namespace TradeMarket.Controllers;

[ApiController]
[Route("[controller]")]
public class CityController : ControllerBase
{
    private readonly ICityRepository _cityRepository;

    public CityController(ICityRepository cityRepository)
    {
        _cityRepository = cityRepository;
    }

    // [HttpGet]
    // public async Task<IActionResult> GetById([FromRoute] Guid id)
    // {
    //     var result = await _cityRepository.FindByIdAsync(id);
    //     if (result.IsSuccess)
    //     {
    //         return Ok(result.Value);
    //     }
    //
    //     return BadRequest();
    // }
}