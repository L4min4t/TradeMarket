using Entities.Dtos.User;
using Entities.Models.Application;
using TradeMarket.Models.ResultPattern;

namespace Services.Interfaces;

public interface IUserService : IBaseService<User, UserBaseDto>
{
    Task<Result> DeleteAsync(Guid applicationUserId);
}