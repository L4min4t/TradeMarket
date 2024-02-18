using AutoMapper;
using Entities.Dtos.User;
using Entities.Models.Application;
using Microsoft.AspNetCore.Identity;
using Repositories.Interfaces;
using Services.Interfaces;
using TradeMarket.Models.ResultPattern;

namespace Services.Services;

public class UserService : BaseService<User, UserBaseDto>, IUserService
{
    private readonly UserManager<AuthUser> _userManager;
    
    public UserService(IUserRepository repository, IMapper mapper, UserManager<AuthUser> userManager) : base(repository, mapper)
    {
        _userManager = userManager;
    }
    
    public new async Task<Result<User>> UpdateAsync(UserUpdateDto dto)
    {
        try
        {
            var user = await Repository.FindByIdAsync(dto.Id);
            var authUser = await _userManager.FindByIdAsync(user.IdentityId);
            
            Mapper.Map(dto, user);
            authUser.UserName = user.Name;
            
            await Repository.UpdateAsync(user);
            await _userManager.UpdateAsync(authUser);
            
            return Result.Ok(await Repository.FindByIdAsync(user.Id));
        }
        catch (Exception ex)
        {
            return Result.Fail<User>(
                $"UserService.UpdateAsync (User:{dto.Id.ToString()})\n" +
                $"An exception occurred: {ex.Message}");
        }
    }
    
    public override async Task<Result> DeleteAsync(Guid applicationUserId)
    {
        try
        {
            var applicationUser = await Repository.FindByIdAsync(applicationUserId);
            var userName = applicationUser.Name;
            var identityUser = await _userManager.FindByIdAsync(applicationUser.IdentityId);
            
            if (applicationUser is null) return Result.Fail(
                $"UserService.DeleteAsync ({typeof(User).Name}:{applicationUserId})\n" +
                $"User in application doesn't exist."
            );
            
            if (identityUser is null) return Result.Fail(
                $"UserService.DeleteAsync ({typeof(User).Name}:{applicationUserId})\n" +
                $"User in identity doesn't exist."
            );

            await Repository.DeleteAsync(applicationUser);
            await _userManager.DeleteAsync(identityUser);

            return Result.Ok($"User {userName} deleted");

        }
        catch (Exception ex)
        {
            return Result.Fail(
                $"UserService.DeleteAsync ({typeof(User).Name}:{applicationUserId})\n" +
                $"An exception occurred: {ex.Message}"
            );
        }
    }
}