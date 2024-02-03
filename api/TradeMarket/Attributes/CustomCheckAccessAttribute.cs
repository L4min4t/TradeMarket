using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Security.Claims;
using Entities.Dtos.Poster;
using Entities.Dtos.User;
using Entities.Models.Auth;
using Entities.Models.Poster;
using Microsoft.AspNetCore.Http.HttpResults;
using Repositories.Interfaces;
using Services.Interfaces;
using TradeMarket.Models.ResultPattern;

namespace TradeMarket.Attributes;

public class CustomCheckAccessAttribute : ActionFilterAttribute
{
    public string RequiredPermission { get; }
    private IPosterRepository _posterRepository { get; set; }
    private IUserRepository _userRepository { get; set; }

    public CustomCheckAccessAttribute(string requiredPermission)
    {
        RequiredPermission = requiredPermission;
    }

    public override async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
        if (!context.HttpContext.User.Claims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value).Contains("Admin"))
        {
            _posterRepository = context.HttpContext.RequestServices.GetService<IPosterRepository>();
            _userRepository = context.HttpContext.RequestServices.GetService<IUserRepository>();
            
            var result = await CheckUserPermission(context, RequiredPermission);

            if (result.IsFailure) 
                context.Result = new ObjectResult(result.Message) { StatusCode = StatusCodes.Status403Forbidden };
            else  await next();
        }
        else await next();
    }


    private async Task<Result> CheckUserPermission(ActionExecutingContext context, string permission)
    {
        var currentUserId = context.HttpContext.User.FindFirst("uid")?.Value;
        return permission switch
        {
            "manage-password" => await CheckPasswordAccess(context),
            "manage-image" => await CheckImageAccess(context, currentUserId),
            "manage-poster" => await CheckPosterAccess(context, currentUserId),
            "manage-user" => await CheckUserAccess(context, currentUserId),
            _ => Result.Fail($"CustomCheckAccessAttribute: Unknown required permission: {permission}.")
        };
    }

    private async Task<Result> CheckPosterAccess(ActionExecutingContext context, string? currentUserId)
    {
        if (context.RouteData.Values.TryGetValue("id", out var idValue) && Guid.TryParse(idValue.ToString(), out 
            Guid id))
            return await CheckPosterAccessHelper(context, id, currentUserId);
        else if (context.ActionArguments.TryGetValue("param", out var model) &&
                 model is PosterUpdateDto posterUpdateDto)
            return await CheckPosterAccessHelper(context, posterUpdateDto.Id, currentUserId);
        else if (context.ActionArguments.TryGetValue("param", out model) &&
                 model is ActivateDeactivatePosterModel activateDeactivatePosterModel)
            return await CheckPosterAccessHelper(context, activateDeactivatePosterModel.PosterId, currentUserId);
        return Result.Fail("CustomCheckAccessAttribute: Unable to parse poster ID from the request.");
    }

    private async Task<Result> CheckPosterAccessHelper(ActionExecutingContext context, Guid id, string currentUserId)
    {
        var poster = await _posterRepository.FindByIdAsync(id);
        if (poster is not null)
            return poster.CreatorId.ToString() == currentUserId
                ? Result.Ok()
                : Result.Fail("User does not have permission to manage this poster.");
        return Result.Fail("Poster does not exist.");
    }
    
    private async Task<Result> CheckPasswordAccess(ActionExecutingContext context)
    {
        var currentEmail = context.HttpContext.User.FindFirstValue(ClaimTypes.Email);
        if (context.ActionArguments.TryGetValue("param", out var value) && value is ChangePasswordModel model)
                    
            return currentEmail.Equals(model.Email)
                ? Result.Ok()
                : Result.Fail("User can change only own password.");
                
        return Result.Fail("CustomCheckAccessAttribute: ChangePasswordModel object isn't valid."); 
    }
    
    private async Task<Result> CheckUserAccess(ActionExecutingContext context, string? currentUserId)
    {
        if (context.RouteData.Values.TryGetValue("id", out var idValue) && Guid.TryParse(idValue.ToString(), out 
                Guid id))
            return await CheckUserAccessHelper(context, id, currentUserId);
        else if (context.ActionArguments.TryGetValue("param", out var model) &&
                 model is UserUpdateDto userUpdateDto) 
            return await CheckUserAccessHelper(context, userUpdateDto.Id, currentUserId);
        
        return Result.Fail("CustomCheckAccessAttribute: Unable to parse user ID from the request.");
    }

    private async Task<Result> CheckUserAccessHelper(ActionExecutingContext context, Guid id, string? currentUserId)
    {
        return id.ToString() == currentUserId
            ? Result.Ok()
            : Result.Fail("User does not have permission to manage this user.");
    }
    
    private async Task<Result> CheckImageAccess(ActionExecutingContext context, string? currentUserId)
    {
        if (context.RouteData.Values.TryGetValue("id", out var idValue) && Guid.TryParse(idValue.ToString(), out Guid id))
        {
            var posters = await _posterRepository.FindByConditionAsync(p => p.ImageId == id.ToString());
            var users = await _userRepository.FindByConditionAsync(u => u.AvatarId == id.ToString());
                    
            if (posters.Any())
                return posters.FirstOrDefault().CreatorId.ToString() == currentUserId
                    ? Result.Ok()
                    : Result.Fail("User does not have permission to delete this image.");
                    
            else if (users.Any())
                return users.FirstOrDefault().Id.ToString() == currentUserId
                    ? Result.Ok()
                    : Result.Fail("User does not have permission to delete this image.");
                    
            else return Result.Fail("Image does not exist.");
        }
        return Result.Fail("CustomCheckAccessAttribute: Unable to parse image ID from the request.");
    }
}