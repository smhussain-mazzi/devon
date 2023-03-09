using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevOnAssignment.Entities.Models
{
    public class Employee
    {
        [Key]
        [StringLength(50)]
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
