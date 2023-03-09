using DevOnAssignment.DTO;
using DevOnAssignment.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DevOnAssignment.Api.Controllers
{
    [Route("api/employees")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeService employeeService;

        public EmployeesController(IEmployeeService employeeService)
        {
            this.employeeService = employeeService;
        }

        [HttpGet]
        public async Task<IActionResult> Get(string? id)
        {
            if (!string.IsNullOrEmpty(id))
            {
                var employee = employeeService.GetEmployeeById(id);
                if (employee == null)
                    return NotFound();
                return Ok(employee);
            }
            return Ok(await employeeService.ListEmployees());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSingle(string id)
        {
            var employee = await employeeService.GetEmployeeById(id);
            if (employee == null)
                return NotFound();
            return Ok(employee);
        }

        [HttpPost]
        public async Task<IActionResult> Add(EmployeeDTO employee)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            await employeeService.AddEmployee(employee);
            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> Update(EmployeeDTO employee)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            await employeeService.UpdateEmployee(employee);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            await employeeService.DeleteEmployee(id);
            return Ok();
        }
    }
}
