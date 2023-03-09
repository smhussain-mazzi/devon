using DevOnAssignment.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevOnAssignment.Services.Interfaces
{
    public interface IEmployeeService
    {
        Task AddEmployee(EmployeeDTO employee);
        Task DeleteEmployee(string id);
        Task<IEnumerable<EmployeeDTO>> ListEmployees();
        Task<EmployeeDTO> GetEmployeeById(string id);
        Task UpdateEmployee(EmployeeDTO employee);
    }
}
