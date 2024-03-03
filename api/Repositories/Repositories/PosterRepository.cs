using System.Linq.Expressions;
using Context.Context;
using Entities.Models.Application;
using Microsoft.EntityFrameworkCore;
using Repositories.Interfaces;

namespace Repositories.Repositories;

public class PosterRepository : BaseRepository<Poster>, IPosterRepository
{
    private readonly ApplicationContext _context;

    public PosterRepository(ApplicationContext context) : base(context)
    {
        _context = context;
    }

    public override async Task<Poster?> FindByIdAsync(Guid id)
        => await DbSet.Include(p => p.Creator.City).FirstOrDefaultAsync(p => p.Id == id);

    public override async Task<List<Poster>?> FindAllAsync()
        => await DbSet.Include(p => p.Creator.City).ToListAsync();

    public override async Task<List<Poster>?> FindByConditionAsync(Expression<Func<Poster, bool>> expression) =>
        await DbSet.Include(p => p.Creator.City).AsNoTracking().Where(expression).ToListAsync();

    public override async Task DeleteAsync(Poster entity)
    {
        using var transaction = _context.Database.BeginTransaction();
        try
        {
            var likedPosters = _context.LikedPosters.Where(ulp => ulp.PosterId == entity.Id);
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