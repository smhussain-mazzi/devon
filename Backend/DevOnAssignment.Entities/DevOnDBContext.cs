using DevOnAssignment.Entities.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevOnAssignment.Entities
{
    public class DevOnDBContext : DbContext
    {
        public DevOnDBContext(DbContextOptions options): base(options)
        {
            
        }

        public DbSet<Employee> Employees { get; set; }
    }
}
