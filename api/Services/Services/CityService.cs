using AutoMapper;
using Entities.Dtos.City;
using Entities.Models.Application;
using Repositories.Interfaces;
using Services.Interfaces;

namespace Services.Services;

public class CityService : BaseService<City, CityBaseDto>, ICityService
{
    public CityService(ICityRepository repository, IMapper mapper) : base(repository, mapper)
    {
    }
}