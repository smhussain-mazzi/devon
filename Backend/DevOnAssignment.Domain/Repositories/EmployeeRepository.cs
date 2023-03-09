using DevOnAssignment.Domain.Interfaces;
using DevOnAssignment.Entities;
using DevOnAssignment.Entities.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevOnAssignment.Domain.Repositories
{
    public class EmployeeRepository : RepositoryBase<Employee>, IEmployeeRepository
    {
        public EmployeeRepository(DevOnDBContext context) : base(context)
        {
        }

        
    }
}
