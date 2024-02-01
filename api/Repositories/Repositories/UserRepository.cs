using System.Linq.Expressions;
using Context.Context;
using Entities.Models.Application;
using Microsoft.EntityFrameworkCore;
using Repositories.Interfaces;

namespace Repositories.Repositories;

public class UserRepository : BaseRepository<User>, IUserRepository
{
    public UserRepository(ApplicationContext context) : base(context)
    {
    }
    
    public override async Task<User?> FindByIdAsync(Guid id) 
        => await DbSet.Include(u => u.City).FirstOrDefaultAsync(u => u.Id == id);
    
    public override async Task<List<User>?> FindAllAsync() 
        => await DbSet.Include(u => u.City).ToListAsync();

    public override async Task<List<User>?> FindByConditionAsync(Expression<Func<User, bool>> expression) =>
        await DbSet.Include(u => u.City).AsNoTracking().Where(expression).ToListAsync();
}