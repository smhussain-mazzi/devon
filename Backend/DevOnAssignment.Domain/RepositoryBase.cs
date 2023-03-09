using DevOnAssignment.Domain.Interfaces;
using DevOnAssignment.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DevOnAssignment.Domain
{
    public abstract class RepositoryBase<T> : IRepositoryBase<T> where T : class
    {
        private readonly DevOnDBContext _dbContext;
        public RepositoryBase(DevOnDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IQueryable<T> Entities => _dbContext.Set<T>();

        public async Task AddAsync(T entity)
        {
            await _dbContext.Set<T>().AddAsync(entity);
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(T entity)
        {
            _dbContext.Set<T>().Remove(entity);
            await _dbContext.SaveChangesAsync();
        }
        
        public async Task DeleteAsync(string id)
        {
            var entity = await GetByIdAsync(id);
            await DeleteAsync(entity);
        }

        public IQueryable<T> GetAll(Expression<Func<T, bool>> expression = null)
        {
            var result = _dbContext.Set<T>().AsNoTracking();
            if(expression != null)
                result = result.Where(expression);
            return result;
        }

        public async Task<T> GetByIdAsync(string id)
        {
            return await _dbContext.Set<T>().FindAsync(id);
        }

        public async Task<T> GetFirstAsync(Expression<Func<T, bool>> expression)
        {
            return await _dbContext.Set<T>().FirstOrDefaultAsync(expression);
        }

        public async Task UpdateAsync(T entity)
        {
            _dbContext.Attach(entity);
            _dbContext.Entry(entity).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
        }
    }
}
