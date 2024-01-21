using System.Linq.Expressions;
using Entities.Models.Application;
using Repositories.Interfaces;
using Services.Interfaces;
using TradeMarket.Models.ResultPattern;

namespace Services.Services;

public class BaseService<TEntity> : IBaseService<TEntity> where TEntity : class, IEntity
{
    protected readonly IBaseRepository<TEntity> Repository;

    public BaseService(IBaseRepository<TEntity> repository)
    {
        Repository = repository;
    }
    
    public async Task<Result> FindAllAsync()
    {
        try
        {
            var entities = await Repository.FindAllAsync();
            if (!entities.Any())
            {
                return Result.Ok(entities, "There aren't any entities");
            }

            return Result.Ok(entities, "Entities retrieved successfully.");
        }
        catch (Exception ex)
        {
            return Result.Fail<List<TEntity>>(
                $"Service.FindAllAsync ({typeof(TEntity).Name}\n An exception occurred: {ex.Message}"
            );
        }
    }

    public async Task<Result> FindByIdAsync(Guid id)
    {
        try
        {
            var entity = await Repository.FindByIdAsync(id);
            if (entity == null)
            {
                return Result.Fail($"Entity with id {id} not found.");
            }
            return Result.Ok(entity, "Entity retrieved successfully.");
        }
        catch (Exception ex)
        {
            return Result.Fail<TEntity>(
                $"Service.FindById ({typeof(TEntity).Name}:{id})\n An exception occurred: {ex.Message}"
            );
        }
    }

    public async Task<Result> FindByConditionAsync(Expression<Func<TEntity, bool>> expression)
    {
        try
        {
            var entities = await Repository.FindByConditionAsync(expression);
            if (!entities.Any())
            {
                return Result.Ok(entities, "There aren't any entities");
            }

            return Result.Ok(entities, "Entities retrieved successfully.");
        }
        catch (Exception ex)
        {
            return Result.Fail<List<TEntity>>(
                $"Service.FindByConditionAsync ({typeof(TEntity).Name})\nAn exception occurred: {ex.Message}"
            );
        }

    }

    public async Task<Result> CreateAsync(TEntity entity)
    {
        try
        {
            await Repository.CreateAsync(entity);
            return Result.Ok($"Entity ({typeof(TEntity).Name}:{entity.Id.ToString()}) added successfully.");
        }
        catch (Exception ex)
        {
            return Result.Fail(
                $"Repository.CreateAsync ({typeof(TEntity).Name}:{entity.Id.ToString()})\n" +
                $"An exception occurred: {ex.Message}"
            );
        }
    }

    public async Task<Result> UpdateAsync(TEntity entity)
    {
        try
        {
            await Repository.UpdateAsync(entity);
            return Result.Ok($"Entity ({typeof(TEntity).Name}:{entity.Id.ToString()}) updated successfully.");
        }
        catch (Exception ex)
        {
            return Result.Fail(
                $"Repository.UpdateAsync ({typeof(TEntity).Name}:{entity.Id.ToString()})\n" +
                $"An exception occurred: {ex.Message}");
        }
        
    }

    public async Task<Result> DeleteAsync(Guid id)
    {
        try
        {
            var entity = await Repository.FindByIdAsync(id);
            if (entity != null)
            {
                await Repository.DeleteAsync(entity);
                return Result.Ok($"Entity ({typeof(TEntity).Name}:{entity.Id.ToString()}) deleted successfully.");  
            } else
            {
                return Result.Fail($"Repository.DeleteAsync ({typeof(TEntity).Name}:{id.ToString()}) not found.");
            }
            
        }
        catch (Exception ex)
        {
            return Result.Fail(
                $"Repository.DeleteAsync ({typeof(TEntity).Name}:{id.ToString()})\n" +
                $"An exception occurred: {ex.Message}"
            );
        }
    }
}