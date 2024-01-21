using System.Linq.Expressions;
using TradeMarket.Models.ResultPattern;

namespace Services.Interfaces;

public interface IBaseService<TDto> where TDto : class
{
    Task<Result> FindAllAsync();
    Task<Result> FindByIdAsync(Guid id);
    Task<Result> FindByConditionAsync(Expression<Func<TDto, bool>> expression);
    Task<Result> CreateAsync(TDto entity);
    Task<Result> UpdateAsync(TDto entity);
    Task<Result>  DeleteAsync(Guid id);
}