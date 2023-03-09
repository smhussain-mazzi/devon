import { EmployeeService } from './../employee.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from 'src/app/employee/employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  constructor(private employeeService: EmployeeService) { }
  dataSource = new MatTableDataSource<Employee>();
  displayedColumns = ['slNo', 'name', 'code', 'dateOfBirth', 'address', 'list-actions'];

  ngOnInit() {
    this.employeeService.listEmployees().subscribe(r => {
      this.dataSource.data = r;
    })
  }

  delete(id: string) {
    if (!!confirm('Are you sure you want to delete?')) {
      this.employeeService.deleteEmployee(id).subscribe(() => {
        this.ngOnInit();
      });
    }
  }
}
