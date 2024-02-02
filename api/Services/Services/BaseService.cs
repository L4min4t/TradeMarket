using System.Linq.Expressions;
using AutoMapper;
using Entities.Dtos;
using Entities.Models.Application;
using Repositories.Interfaces;
using Services.Interfaces;
using TradeMarket.Models.ResultPattern;

namespace Services.Services;

public class BaseService<TEntity, TDto> : IBaseService<TEntity, TDto>
    where TEntity : class, IEntity, new()
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
                return Result.Ok<List<TEntity>?>(entities);
            }

            return Result.Ok<List<TEntity>?>(entities);
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
            return Result.Ok<TEntity?>(entity);
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
                return Result.Ok<List<TEntity>?>(entities);
            }

            return Result.Ok<List<TEntity>?>(entities);
        }
        catch (Exception ex)
        {
            return Result.Fail<List<TEntity>?>(
                $"Service.FindByConditionAsync ({typeof(TEntity).Name})\nAn exception occurred: {ex.Message}"
            );
        }

    }

    public virtual async Task<Result<TEntity>> CreateAsync(TDto dto)
    {
        try
        {
            var entity = new TEntity();
            Mapper.Map(dto, entity);
            dto.Id = entity.Id;
            
            await Repository.CreateAsync(entity);
            
            return Result.Ok<TEntity>(await Repository.FindByIdAsync(entity.Id));
        }
        catch (Exception ex)
        {
            return Result.Fail<TEntity>(
                $"Service.CreateAsync ({typeof(TEntity).Name}:{dto.Id.ToString()})\n" +
                $"An exception occurred: {ex.Message}"
            );
        }
    }

    public virtual async Task<Result<TEntity>> UpdateAsync(TDto dto)
    {
        try
        {
            var entity = await Repository.FindByIdAsync(dto.Id);
            
            Mapper.Map(dto, entity);
            
            await Repository.UpdateAsync(entity);
            
            return Result.Ok<TEntity>(await Repository.FindByIdAsync(entity.Id));
        }
        catch (Exception ex)
        {
            return Result.Fail<TEntity>(
                $"Service.UpdateAsync ({typeof(TEntity).Name}:{dto.Id.ToString()})\n" +
                $"An exception occurred: {ex.Message}");
        }
    }

    public virtual async Task<Result> DeleteAsync(Guid id)
    {
        try
        {
            var entity = await Repository.FindByIdAsync(id);
            if (entity != null)
            {
                await Repository.DeleteAsync(entity);
                return Result.Ok($"({typeof(TEntity).Name}:{entity.Id.ToString()}) deleted successfully.");  
            } else
            {
                return Result.Fail($"Service.DeleteAsync ({typeof(TEntity).Name}:{id.ToString()}) not found.");
            }
            
        }
        catch (Exception ex)
        {
            return Result.Fail(
                $"Service.DeleteAsync ({typeof(TEntity).Name}:{id.ToString()})\n" +
                $"An exception occurred: {ex.Message}"
            );
        }
    }
}