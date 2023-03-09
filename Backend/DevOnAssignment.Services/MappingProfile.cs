using AutoMapper;
using DevOnAssignment.DTO;
using DevOnAssignment.Entities.Models;
using DevOnAssignment.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace DevOnAssignment.Services
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<EmployeeDTO, Employee>();
            CreateMap<Employee, EmployeeDTO>();
        }

    }
}
