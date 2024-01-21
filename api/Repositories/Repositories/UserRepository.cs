using Context.Context;
using Entities.Models.Application;
using Repositories.Interfaces;

namespace Repositories.Repositories;

public class UserRepository : BaseRepository<User>, IUserRepository
{
    public UserRepository(ApplicationContext context) : base(context)
    {
    }
}