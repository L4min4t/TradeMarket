using Entities.Models.Application;
using Repositories.Interfaces;
using Services.Interfaces;

namespace Services.Services;

public class UserService : BaseService<User>, IUserService
{
    public UserService(IUserRepository repository) : base(repository)
    {
    }
}