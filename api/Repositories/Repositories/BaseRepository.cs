using System.Linq.Expressions;
using Context.Context;
using Entities.Models.Application;
using Microsoft.EntityFrameworkCore;
using Repositories.Interfaces;
using TradeMarket.Models.ResultPattern;

namespace Repositories.Repositories;

public abstract class BaseRepository<T> : IBaseRepository<T> where T : class, IEntity
{
    protected readonly DbContext Context;
    protected readonly DbSet<T> DbSet;
    
    public BaseRepository(ApplicationContext context) 
    {
        Context = context;
        DbSet = context.Set<T>();
    }
    
    public virtual async Task<Result<List<T>>> FindAllAsync()
    {
        try
        {
            var entities = await DbSet.ToListAsync();
            if (!entities.Any())
            {
                return Result.Ok(entities, "There aren't any entities");
            }

            return Result.Ok(entities, "Entities retrieved successfully.");
        }
        catch (Exception ex)
        {
            return Result.Fail<List<T>>(
                $"Repository.FindAllAsync ({typeof(T).Name}\n An exception occurred: {ex.Message}"
                );
        }
    } 

    public virtual async Task<Result<T>> FindById(Guid id)
    {
        try
        {
            var entity = await DbSet.FindAsync(id);
            if (entity == null)
            {
                return Result.Fail<T>($"Entity with id {id} not found.");
            }
            return Result.Ok(entity, "Entity retrieved successfully.");
        }
        catch (Exception ex)
        {
            return Result.Fail<T>(
                $"Repository.FindById ({typeof(T).Name}:{id})\n An exception occurred: {ex.Message}"
                );
        }
    }


    public virtual async Task<Result<List<T>>> FindByConditionAsync(Expression<Func<T, bool>> expression)
    {
        try
        {
            var entities = await DbSet.AsNoTracking().Where(expression).ToListAsync();
            if (!entities.Any())
            {
                return Result.Ok(entities, "There aren't any entities");
            }

            return Result.Ok(entities, "Entities retrieved successfully.");
        }
        catch (Exception ex)
        {
            return Result.Fail<List<T>>(
                $"Repository.FindByConditionAsync ({typeof(T).Name})\nAn exception occurred: {ex.Message}"
                );
        }
    }

    public virtual async Task<Result> CreateAsync(T entity)
    {
        try
        {
            await DbSet.AddAsync(entity);
            await Context.SaveChangesAsync();
            return Result.Ok($"Entity ({typeof(T).Name}:{entity.Id.ToString()}) added successfully.");
        }
        catch (Exception ex)
        {
            return Result.Fail(
                $"Repository.CreateAsync ({typeof(T).Name}:{entity.Id.ToString()})\n" +
                $"An exception occurred: {ex.Message}"
                );
        }
    }

    public virtual async Task<Result> UpdateAsync(T entity)
    {
        try
        {
            DbSet.Attach(entity);
            Context.Entry(entity).State = EntityState.Modified;
            await Context.SaveChangesAsync();
            return Result.Ok($"Entity ({typeof(T).Name}:{entity.Id.ToString()}) updated successfully.");
        }
        catch (Exception ex)
        {
            return Result.Fail(
                $"Repository.UpdateAsync ({typeof(T).Name}:{entity.Id.ToString()})\n" +
                $"An exception occurred: {ex.Message}");
        }
    }

    public virtual async Task<Result> DeleteAsync(T entity)
    {
        try
        {
            DbSet.Remove(entity);
            await Context.SaveChangesAsync();
            return Result.Ok($"Entity ({typeof(T).Name}:{entity.Id.ToString()}) deleted successfully.");
        }
        catch (Exception ex)
        {
            return Result.Fail(
                $"Repository.DeleteAsync ({typeof(T).Name}:{entity.Id.ToString()})\n" +
                $"An exception occurred: {ex.Message}"
                );
        }
    }
}