using Entities.Models.Application;
using Repositories.Interfaces;
using Services.Interfaces;

namespace Services.Services;

public class CityService : BaseService<City>, ICityService
{
    public CityService(ICityRepository repository) : base(repository)
    {
    }
}