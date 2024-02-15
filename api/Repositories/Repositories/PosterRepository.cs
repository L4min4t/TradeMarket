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
        => await DbSet.Include(p => p.Creator.City).FirstOrDefaultAsync(p => p.Id == id);
    
    public override async Task<List<Poster>?> FindAllAsync() 
        => await DbSet.Include(p => p.Creator.City).ToListAsync();

    public override async Task<List<Poster>?> FindByConditionAsync(Expression<Func<Poster, bool>> expression) =>
        await DbSet.Include(p => p.Creator.City).AsNoTracking().Where(expression).ToListAsync();
}