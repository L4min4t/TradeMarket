using Entities.Models.Application;
using Repositories.Interfaces;
using Services.Interfaces;

namespace Services.Services;

public class PosterService : BaseService<Poster>, IPosterService
{
    public PosterService(IPosterRepository repository) : base(repository)
    {
    }
}
