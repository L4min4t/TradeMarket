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
    
    public async Task<Result<List<TEntity>?>> FindAllAsync()
    {
        try
        {
            var entities = await Repository.FindAllAsync();
            if (!entities.Any())
            {
                return Result.Ok<List<TEntity>?>(entities, "There aren't any entities");
            }

            return Result.Ok<List<TEntity>?>(entities, "Entities retrieved successfully.");
        }
        catch (Exception ex)
        {
            return Result.Fail<List<TEntity>?>(
                $"Service.FindAllAsync ({typeof(TEntity).Name}\n An exception occurred: {ex.Message}"
            );
        }
    }

    public async Task<Result<TEntity?>> FindByIdAsync(Guid id)
    {
        try
        {
            var entity = await Repository.FindByIdAsync(id);
            if (entity == null)
            {
                return Result.Fail<TEntity?>($"Entity with id {id} not found.");
            }
            return Result.Ok<TEntity?>(entity, "Entity retrieved successfully.");
        }
        catch (Exception ex)
        {
            return Result.Fail<TEntity?>(
                $"Service.FindById ({typeof(TEntity).Name}:{id})\n An exception occurred: {ex.Message}"
            );
        }
    }

    public async Task<Result<List<TEntity>?>> FindByConditionAsync(Expression<Func<TEntity, bool>> expression)
    {
        try
        {
            var entities = await Repository.FindByConditionAsync(expression);
            if (!entities.Any())
            {
                return Result.Ok<List<TEntity>?>(entities, "There aren't any entities");
            }

            return Result.Ok<List<TEntity>?>(entities, "Entities retrieved successfully.");
        }
        catch (Exception ex)
        {
            return Result.Fail<List<TEntity>?>(
                $"Service.FindByConditionAsync ({typeof(TEntity).Name})\nAn exception occurred: {ex.Message}"
            );
        }

    }

    public async Task<Result<bool>> CreateAsync(TEntity entity)
    {
        try
        {
            await Repository.CreateAsync(entity);
            return Result.Ok<bool>(true, $"Entity ({typeof(TEntity).Name}:{entity.Id.ToString()}) added successfully.");
        }
        catch (Exception ex)
        {
            return Result.Fail<bool>(
                $"Repository.CreateAsync ({typeof(TEntity).Name}:{entity.Id.ToString()})\n" +
                $"An exception occurred: {ex.Message}"
            );
        }
    }

    public async Task<Result<bool>> UpdateAsync(TEntity entity)
    {
        try
        {
            await Repository.UpdateAsync(entity);
            return Result.Ok<bool>(true, $"Entity ({typeof(TEntity).Name}:{entity.Id.ToString()}) updated successfully.");
        }
        catch (Exception ex)
        {
            return Result.Fail<bool>(
                $"Repository.UpdateAsync ({typeof(TEntity).Name}:{entity.Id.ToString()})\n" +
                $"An exception occurred: {ex.Message}");
        }
        
    }

    public async Task<Result<bool>> DeleteAsync(Guid id)
    {
        try
        {
            var entity = await Repository.FindByIdAsync(id);
            if (entity != null)
            {
                await Repository.DeleteAsync(entity);
                return Result.Ok<bool>(true, $"Entity ({typeof(TEntity).Name}:{entity.Id.ToString()}) deleted successfully.");  
            } else
            {
                return Result.Fail<bool>($"Repository.DeleteAsync ({typeof(TEntity).Name}:{id.ToString()}) not found.");
            }
            
        }
        catch (Exception ex)
        {
            return Result.Fail<bool>(
                $"Repository.DeleteAsync ({typeof(TEntity).Name}:{id.ToString()})\n" +
                $"An exception occurred: {ex.Message}"
            );
        }
    }
}