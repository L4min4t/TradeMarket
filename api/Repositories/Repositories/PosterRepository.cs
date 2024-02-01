using System.Linq.Expressions;
using Context.Context;
using Entities.Models.Application;
using Microsoft.EntityFrameworkCore;
using Repositories.Interfaces;

namespace Repositories.Repositories;

public class PosterRepository : BaseRepository<Poster>, IPosterRepository
{
    public PosterRepository(ApplicationContext context) : base(context)
    {
    }
    
    public override async Task<Poster?> FindByIdAsync(Guid id) 
        => await DbSet.Include(u => u.Creator.City).FirstOrDefaultAsync(u => u.Id == id);
    
    public override async Task<List<Poster>?> FindAllAsync() 
        => await DbSet.Include(u => u.Creator.City).ToListAsync();

    public override async Task<List<Poster>?> FindByConditionAsync(Expression<Func<Poster, bool>> expression) =>
        await DbSet.Include(u => u.Creator.City).AsNoTracking().Where(expression).ToListAsync();
}