using System.Linq.Expressions;
using Context.Context;
using Entities.Models.Application;
using Microsoft.EntityFrameworkCore;
using Repositories.Interfaces;

namespace Repositories.Repositories;

public class CityRepository : BaseRepository<City>, ICityRepository
{
    public CityRepository(ApplicationContext context) : base(context)
    {
    }

    public override async Task<City?> FindByIdAsync(Guid id)
        => await DbSet.Include(u => u.Users).FirstOrDefaultAsync(u => u.Id == id);

    public override async Task<List<City>?> FindAllAsync()
        => await DbSet.Include(u => u.Users).ToListAsync();

    public override async Task<List<City>?> FindByConditionAsync(Expression<Func<City, bool>> expression) =>
        await DbSet.Include(u => u.Users).AsNoTracking().Where(expression).ToListAsync();
}