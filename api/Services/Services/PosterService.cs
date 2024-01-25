using AutoMapper;
using Entities.Dtos;
using Entities.Dtos.Poster;
using Entities.Models.Application;
using Repositories.Interfaces;
using Services.Interfaces;
using TradeMarket.Models.ResultPattern;

namespace Services.Services;

public class PosterService : BaseService<Poster, PosterBaseDto>, IPosterService
{
    public PosterService(IPosterRepository repository, IMapper mapper) : base(repository, mapper)
    {
    }
}
