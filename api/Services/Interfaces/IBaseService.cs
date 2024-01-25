using System.Linq.Expressions;
using Entities.Dtos;
using TradeMarket.Models.ResultPattern;

namespace Services.Interfaces;

public interface IBaseService<TEntity, TDto> 
    where TEntity : class
    where TDto : BaseDto 
{
    Task<Result<List<TEntity>?>> FindAllAsync();
    Task<Result<TEntity?>> FindByIdAsync(Guid id);
    Task<Result<List<TEntity>?>> FindByConditionAsync(Expression<Func<TEntity, bool>> expression);
    Task<Result<bool>> CreateAsync(TDto dto);
    Task<Result<bool>> UpdateAsync(TDto dto);
    Task<Result<bool>>  DeleteAsync(Guid id);
}