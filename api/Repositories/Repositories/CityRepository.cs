using Context.Context;
using Entities.Models.Application;
using Repositories.Interfaces;

namespace Repositories.Repositories;

public class CityRepository : BaseRepository<City>, ICityRepository
{
    public CityRepository(ApplicationContext context) : base(context)
    {
    }
}