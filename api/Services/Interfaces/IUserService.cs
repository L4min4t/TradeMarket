using Entities.Dtos.User;
using Entities.Models.Application;

namespace Services.Interfaces;

public interface IUserService : IBaseService<User, UserBaseDto>
{
    
}