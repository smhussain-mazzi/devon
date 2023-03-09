using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DevOnAssignment.Domain.Interfaces
{
    public interface IRepositoryBase<T> where T: class
    {
        Task AddAsync(T entity);

        Task DeleteAsync(T entity);

        Task DeleteAsync(string id);

        IQueryable<T> GetAll(Expression<Func<T,bool>> expression = null);

        Task<T> GetByIdAsync(string id);

        Task UpdateAsync(T entity);

        Task<T> GetFirstAsync(Expression<Func<T, bool>> expression);

        IQueryable<T> Entities { get; }
    }
}
