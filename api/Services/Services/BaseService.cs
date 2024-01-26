using System.Linq.Expressions;
using AutoMapper;
using Entities.Dtos;
using Entities.Models.Application;
using Repositories.Interfaces;
using Services.Interfaces;
using TradeMarket.Models.ResultPattern;

namespace Services.Services;

public class BaseService<TEntity, TDto> : IBaseService<TEntity, TDto>
    where TEntity : class, IEntity
    where TDto : BaseDto
{
    protected readonly IBaseRepository<TEntity> Repository;
    protected readonly IMapper Mapper;

    public BaseService(IBaseRepository<TEntity> repository, IMapper mapper)
    {
        Repository = repository;
        Mapper = mapper;
    }
    
    public virtual async Task<Result<List<TEntity>?>> FindAllAsync()
    {
        try
        {
            var entities = await Repository.FindAllAsync();
            if (!entities.Any())
            {
                return Result.Ok<List<TEntity>?>(entities, $"There aren't any {typeof(TEntity).Name} entities");
            }

            return Result.Ok<List<TEntity>?>(entities, $"{typeof(TEntity).Name} retrieved successfully.");
        }
        catch (Exception ex)
        {
            return Result.Fail<List<TEntity>?>(
                $"Service.FindAllAsync ({typeof(TEntity).Name}\n An exception occurred: {ex.Message}"
            );
        }
    }

    public virtual async Task<Result<TEntity?>> FindByIdAsync(Guid id)
    {
        try
        {
            var entity = await Repository.FindByIdAsync(id);
            if (entity == null)
            {
                return Result.Fail<TEntity?>($"{typeof(TEntity).Name} with id {id} not found.");
            }
            return Result.Ok<TEntity?>(entity, $"{typeof(TEntity).Name} retrieved successfully.");
        }
        catch (Exception ex)
        {
            return Result.Fail<TEntity?>(
                $"Service.FindById ({typeof(TEntity).Name}:{id})\n An exception occurred: {ex.Message}"
            );
        }
    }

    public virtual async Task<Result<List<TEntity>?>> FindByConditionAsync(Expression<Func<TEntity, bool>> expression)
    {
        try
        {
            var entities = await Repository.FindByConditionAsync(expression);
            if (!entities.Any())
            {
                return Result.Ok<List<TEntity>?>(entities, $"There aren't any {typeof(TEntity).Name} entities");
            }

            return Result.Ok<List<TEntity>?>(entities, $"{typeof(TEntity).Name} retrieved successfully.");
        }
        catch (Exception ex)
        {
            return Result.Fail<List<TEntity>?>(
                $"Service.FindByConditionAsync ({typeof(TEntity).Name})\nAn exception occurred: {ex.Message}"
            );
        }

    }

    public virtual async Task<Result<bool>> CreateAsync(TDto dto)
    {
        try
        {
            var entity = Mapper.Map<TEntity>(dto);
            
            await Repository.CreateAsync(entity);
            
            return Result.Ok<bool>(true, $"Entity ({typeof(TEntity).Name}:{entity.Id.ToString()}) added successfully.");
        }
        catch (Exception ex)
        {
            return Result.Fail<bool>(
                $"Service.CreateAsync ({typeof(TEntity).Name}:{dto.Id.ToString()})\n" +
                $"An exception occurred: {ex.Message}"
            );
        }
    }

    public virtual async Task<Result<bool>> UpdateAsync(TDto dto)
    {
        try
        {
            var entity = await Repository.FindByIdAsync(dto.Id);
            
            Mapper.Map(dto, entity);
            
            await Repository.UpdateAsync(entity);
            
            return Result.Ok<bool>(true, $"Entity ({typeof(TEntity).Name}:{dto.Id.ToString()}) updated successfully.");
        }
        catch (Exception ex)
        {
            return Result.Fail<bool>(
                $"Service.UpdateAsync ({typeof(TEntity).Name}:{dto.Id.ToString()})\n" +
                $"An exception occurred: {ex.Message}");
        }
        
    }

    public virtual async Task<Result<bool>> DeleteAsync(Guid id)
    {
        try
        {
            var entity = await Repository.FindByIdAsync(id);
            if (entity != null)
            {
                await Repository.DeleteAsync(entity);
                return Result.Ok<bool>(true, $"({typeof(TEntity).Name}:{entity.Id.ToString()}) deleted successfully.");  
            } else
            {
                return Result.Fail<bool>($"Service.DeleteAsync ({typeof(TEntity).Name}:{id.ToString()}) not found.");
            }
            
        }
        catch (Exception ex)
        {
            return Result.Fail<bool>(
                $"Service.DeleteAsync ({typeof(TEntity).Name}:{id.ToString()})\n" +
                $"An exception occurred: {ex.Message}"
            );
        }
    }
}