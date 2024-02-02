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