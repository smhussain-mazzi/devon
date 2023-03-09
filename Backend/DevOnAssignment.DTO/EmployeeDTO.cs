using AutoMapper;
using DevOnAssignment.Entities.Models;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevOnAssignment.DTO
{
    public class EmployeeDTO
    {
        public string? Id { get; set; }

        [Required]
        [StringLength(60)]
        public string? Name { get; set; }

        [Required]
        [StringLength(15)]
        public string? Code { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }

        [Required]
        [StringLength(100)]
        public string? Address { get; set; }
    }
}
