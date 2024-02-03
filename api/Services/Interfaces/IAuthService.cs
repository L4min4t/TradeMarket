using Entities.Models.Token;
using Entities.Models.Application;
using Entities.Models.Auth;
using Microsoft.AspNetCore.Identity;
using TradeMarket.Models.ResultPattern;

namespace Services.Interfaces;

public interface IAuthService
{
    Task<Result<(IdentityResult, User)>> RegisterUserAsync(RegisterModel model);
    Task<Result<TokenModel>> LoginUserAsync(LoginModel model);
    Task<Result<TokenModel>> ChangePasswordAsync(ChangePasswordModel model);
}