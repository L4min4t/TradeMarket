using Context.Context;
using Entities.Models.Application;
using Repositories.Interfaces;

namespace Repositories.Repositories;

public class PosterRepository : BaseRepository<Poster>, IPosterRepository
{
    public PosterRepository(ApplicationContext context) : base(context)
    {
    }
}