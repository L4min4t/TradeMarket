using Entities.Models.Application;
using Entities.Models.Token;
using TradeMarket.Models.ResultPattern;

namespace Services.Interfaces;

public interface IJwtService
{
    Task<Result<TokenModel>> GenerateTokenPairAsync(AuthUser user);
    Task<Result<TokenModel>> RefreshTokenAsync(RefreshTokenModel tokenModel);
}