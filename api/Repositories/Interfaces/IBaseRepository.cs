using System.Linq.Expressions;
using TradeMarket.Models.ResultPattern;

namespace Repositories.Interfaces;

public interface IBaseRepository<T>
{
    Task<Result<List<T>>> FindAllAsync();
    Task<Result<T?>> FindById(Guid id);
    Task<Result<List<T>>> FindByConditionAsync(Expression<Func<T, bool>> expression);
    Task<Result> CreateAsync(T entity);
    Task<Result> UpdateAsync(T entity);
    Task<Result>  DeleteAsync(T entity);
}