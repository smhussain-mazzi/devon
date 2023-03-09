using AutoMapper;
using AutoMapper.QueryableExtensions;
using DevOnAssignment.Domain.Interfaces;
using DevOnAssignment.DTO;
using DevOnAssignment.Entities.Models;
using DevOnAssignment.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevOnAssignment.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository employeeRepository;
        private readonly IMapper mapper;

        public EmployeeService(IEmployeeRepository employeeRepository, IMapper mapper)
        {
            this.employeeRepository = employeeRepository;
            this.mapper = mapper;
        }

        public async Task<IEnumerable<EmployeeDTO>> ListEmployees()
        {
            return await employeeRepository.GetAll().ProjectTo<EmployeeDTO>(mapper.ConfigurationProvider).ToListAsync();
        }

        public async Task AddEmployee(EmployeeDTO employee)
        {
            var emp = mapper.Map<Employee>(employee);
            emp.Id = Guid.NewGuid().ToString("n");
            await employeeRepository.AddAsync(emp);
        }

        public async Task DeleteEmployee(string id)
        {
            await employeeRepository.DeleteAsync(id);
        }

        public async Task UpdateEmployee(EmployeeDTO employee)
        {
            await employeeRepository.UpdateAsync(mapper.Map<Employee>(employee));
        }

        public async Task<EmployeeDTO> GetEmployeeById(string id)
        {
            return mapper.Map<EmployeeDTO>(await employeeRepository.GetByIdAsync(id));
        }
    }
}
