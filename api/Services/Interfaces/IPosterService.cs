using Entities.Dtos.Poster;
using Entities.Models.Application;
using Entities.Models.Poster;
using TradeMarket.Models.ResultPattern;

namespace Services.Interfaces;

public interface IPosterService : IBaseService<Poster, PosterBaseDto>
{
    Task<Result> ModerateAsync(ModeratePosterModel model);
    Task<Result> ChangeStatusAsync(ActivateDeactivatePosterModel model);
    Task<Result> LikeAsync(Guid id);
    Task<Result> ViewAsync(Guid id);
    Task<Result<List<Poster>>> GetLikedAsync();
    Task<Result<List<Poster>>> GetUserPosters();
}