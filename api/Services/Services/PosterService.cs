using AutoMapper;
using Entities.Dtos;
using Entities.Dtos.Poster;
using Entities.Models.Application;
using Entities.Models.Poster;
using Microsoft.AspNetCore.Http;
using Repositories.Interfaces;
using Services.Interfaces;
using TradeMarket.Models.ResultPattern;

namespace Services.Services;

public class PosterService : BaseService<Poster, PosterBaseDto>, IPosterService
{
    private readonly ILikedPosterRepository _likedPosterRepository;
    private readonly IHttpContextAccessor _context;

    public PosterService(IPosterRepository repository, IMapper mapper, ILikedPosterRepository posterRepository,
        IHttpContextAccessor context) :
        base(repository, mapper)
    {
        _likedPosterRepository = posterRepository;
        _context = context;
    }

    public async Task<Result<List<Poster>>> GetUserPosters()
    {
        try
        {
            var userId = _context.HttpContext.User.FindFirst("uid")?.Value;
            var posters = await Repository.FindByConditionAsync(p => p.CreatorId.ToString() == userId);

            return Result.Ok(posters);
        }
        catch (Exception ex)
        {
            return Result.Fail<List<Poster>>("PosterService Server Fail!");
        }
    }

    public async Task<Result> ModerateAsync(ModeratePosterModel model)
    {
        try
        {
            var entity = await Repository.FindByIdAsync(model.PosterId);

            entity.IsModerated = model.ModerateResult;
            entity.IsActive = model.IsActivated;
            entity.PublishedAt = model.ModerateResult ? DateTime.Now : null;

            await Repository.UpdateAsync(entity);

            return Result.Ok();
        }
        catch (Exception ex)
        {
            return Result.Fail("PosterService Server Fail!");
        }
    }

    public async Task<Result> ChangeStatusAsync(ActivateDeactivatePosterModel model)
    {
        try
        {
            var entity = await Repository.FindByIdAsync(model.PosterId);

            entity.IsActive = model.Status;
            entity.PublishedAt = model.Status ? DateTime.Now : null;

            await Repository.UpdateAsync(entity);

            return Result.Ok();
        }
        catch (Exception ex)
        {
            return Result.Fail("PosterService Server Fail!");
        }
    }

    public async Task<Result> LikeAsync(Guid id)
    {
        try
        {
            var userId = _context.HttpContext.User.FindFirst("uid")?.Value;
            var poster = await Repository.FindByIdAsync(id);
            var entity = await _likedPosterRepository.FindByConditionAsync(
                e => e.PosterId == id && e.UserId.ToString() == userId
            );
            if (!entity.Any())
            {
                poster.NumberLiked += 1;
                await Repository.UpdateAsync(poster);
                await _likedPosterRepository.CreateAsync(
                    new UserLikedPoster() { UserId = new Guid(userId), PosterId = id }
                );
                return Result.Ok();
            }
            else
            {
                poster.NumberLiked -= 1;
                await Repository.UpdateAsync(poster);
                await _likedPosterRepository.DeleteAsync(entity.First());
                return Result.Ok();
            }
        }
        catch (Exception ex)
        {
            return Result.Fail("PosterService Server Fail!");
        }
    }

    public async Task<Result> ViewAsync(Guid id)
    {
        try
        {
            var entity = await Repository.FindByIdAsync(id);
            if (entity is not null)
            {
                entity.NumberViewed += 1;

                await Repository.UpdateAsync(entity);

                return Result.Ok();
            }
            else
            {
                return Result.Fail($"Poster not found!");
            }
        }
        catch (Exception ex)
        {
            return Result.Fail("PosterService Server Fail!");
        }
    }

    public async Task<Result<List<Poster>>> GetLikedAsync()
    {
        try
        {
            var userId = _context.HttpContext.User.FindFirst("uid")?.Value;
            if (userId == null)
                return Result.Fail<List<Poster>>($"User doesnt exist!");
            var likedPosters = await _likedPosterRepository.FindByConditionAsync(e => e.UserId.ToString() == userId);
            var likedIds = likedPosters.Select(item => item.PosterId);
            var posters = await Repository.FindByConditionAsync(e => likedIds.Contains(e.Id));
            return Result.Ok(posters);
        }
        catch (Exception ex)
        {
            return Result.Fail<List<Poster>>("PosterService Server Fail!");
        }
    }
}