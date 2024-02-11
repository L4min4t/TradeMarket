using AutoMapper;
using Entities.Dtos;
using Entities.Dtos.Poster;
using Entities.Models.Application;
using Entities.Models.Poster;
using Repositories.Interfaces;
using Services.Interfaces;
using TradeMarket.Models.ResultPattern;

namespace Services.Services;

public class PosterService : BaseService<Poster, PosterBaseDto>, IPosterService
{
    private readonly ILikedPosterRepository _likedPosterRepository;
    public PosterService(IPosterRepository repository, IMapper mapper, ILikedPosterRepository posterRepository) : base(repository, mapper)
    {
        _likedPosterRepository = posterRepository;
    }

    public async Task<Result<Poster>> ModerateAsync(ModeratePosterModel model)
    {
        try
        {
            var entity = await Repository.FindByIdAsync(model.PosterId);

            entity.IsModerated = model.ModerateResult;
            entity.IsActive = model.IsActivated;
            entity.PublishedAt = model.ModerateResult ?  DateTime.Now : null;
            
            await Repository.UpdateAsync(entity);
            
            return Result.Ok<Poster>(await Repository.FindByIdAsync(entity.Id),
                $"Entity (Poster:{model.PosterId.ToString()}) updated successfully.");
        }
        catch (Exception ex)
        {
            return Result.Fail<Poster>(
                $"PosterService.ModerateAsync (Poster:{model.PosterId.ToString()})\n" +
                $"An exception occurred: {ex.Message}");
        }
    }
    
    public async Task<Result<Poster>> ChangeStatusAsync(ActivateDeactivatePosterModel model)
    {
        try
        {
            var entity = await Repository.FindByIdAsync(model.PosterId);

            entity.IsActive = model.Status;
            entity.PublishedAt = model.Status ?  DateTime.Now : null;
            
            await Repository.UpdateAsync(entity);
            
            return Result.Ok<Poster>(await Repository.FindByIdAsync(entity.Id),
                $"Entity (Poster:{model.PosterId.ToString()}) updated successfully.");
        }
        catch (Exception ex)
        {
            return Result.Fail<Poster>(
                $"PosterService.ChangeStatusAsync (Poster:{model.PosterId.ToString()})\n" +
                $"An exception occurred: {ex.Message}");
        }
    }
    
    public async Task<Result<Poster>> LikeAsync(LikePosterModel model)
    {
        try
        {
            var entity = await _likedPosterRepository.FindByConditionAsync(
                e => e.PosterId == model.PosterId && e.UserId == model.UserId
                );
            if (!entity.Any())
            {
                await _likedPosterRepository.CreateAsync(
                    new UserLikedPoster() { UserId = model.UserId, PosterId = model.PosterId }
                );
                return Result.Ok<Poster>(await Repository.FindByIdAsync(model.PosterId),
                    $"(Poster:{model.PosterId} liked by (User:{model.UserId}");
            }
            else
            {
                await _likedPosterRepository.DeleteAsync(entity.First());
                return Result.Ok<Poster>(await Repository.FindByIdAsync(model.PosterId),
                    $"(Poster:{model.PosterId} unliked by (User:{model.UserId}");
            }
        }
        catch (Exception ex)
        {
            return Result.Fail<Poster>(
                $"PosterService.LikeAsync (Poster:{model.PosterId.ToString()})(User:{model.UserId})\n" +
                $"An exception occurred: {ex.Message}");
        }
    }
}
