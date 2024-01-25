using AutoMapper;
using Entities.Dtos.User;
using Entities.Models.Application;
using Repositories.Interfaces;
using Services.Interfaces;

namespace Services.Services;

public class UserService : BaseService<User, UserBaseDto>, IUserService
{
    public UserService(IUserRepository repository, IMapper mapper) : base(repository, mapper)
    {
    }
}