using Context.Context;
using Entities.Models.Application;
using Repositories.Interfaces;

namespace Repositories.Repositories;

public class LikedPosterRepository : BaseRepository<UserLikedPoster>, ILikedPosterRepository
{
    public LikedPosterRepository(ApplicationContext context) : base(context)
    {
    }
}