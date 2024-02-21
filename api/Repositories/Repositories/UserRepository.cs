using System.Linq.Expressions;
using Context.Context;
using Entities.Models.Application;
using Microsoft.EntityFrameworkCore;
using Repositories.Interfaces;

namespace Repositories.Repositories;

public class UserRepository : BaseRepository<User>, IUserRepository
{
    private readonly ApplicationContext _context;
    public UserRepository(ApplicationContext context) : base(context)
    {
        _context = context;
    }
    
    public override async Task<User?> FindByIdAsync(Guid id) 
        => await DbSet.Include(u => u.City).FirstOrDefaultAsync(u => u.Id == id);
    
    public override async Task<List<User>?> FindAllAsync() 
        => await DbSet.Include(u => u.City).ToListAsync();

    public override async Task<List<User>?> FindByConditionAsync(Expression<Func<User, bool>> expression) =>
        await DbSet.Include(u => u.City).AsNoTracking().Where(expression).ToListAsync();
    
    public override async Task DeleteAsync(User entity)
    {

        using var transaction = _context.Database.BeginTransaction();
        try
        {
            var likedPosters = _context.LikedPosters.Where(ulp => ulp.UserId == entity.Id);
            _context.LikedPosters.RemoveRange(likedPosters);
            
            DbSet.Remove(entity);

            await _context.SaveChangesAsync();
            await transaction.CommitAsync();
        }
        catch
        {
            await transaction.RollbackAsync();
            throw;
        }
    }
}
