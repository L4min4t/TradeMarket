using System.Linq.Expressions;
using TradeMarket.Models.ResultPattern;

namespace Services.Interfaces;

public interface IBaseService<TDto> where TDto : class
{
    Task<Result<List<TDto>?>> FindAllAsync();
    Task<Result<TDto?>> FindByIdAsync(Guid id);
    Task<Result<List<TDto>?>> FindByConditionAsync(Expression<Func<TDto, bool>> expression);
    Task<Result<bool>> CreateAsync(TDto entity);
    Task<Result<bool>> UpdateAsync(TDto entity);
    Task<Result<bool>>  DeleteAsync(Guid id);
}