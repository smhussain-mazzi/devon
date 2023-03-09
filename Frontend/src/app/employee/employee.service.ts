import { DataService } from './../services/data.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from 'src/app/employee/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends DataService {
  path: string = 'employees';

  constructor(http: HttpClient) {
    super(http);
  }
  listEmployees() {
    return this.get<Employee>(this.path);
  }

  getEmployee(id: string) {
    return this.getSingle<Employee>(this.path);
  }

  addEmployee(employee: Employee) {
    return this.post<Employee>(this.path, employee);
  }

  deleteEmployee(id: string) {
    return this.delete(this.path, id);
  }
}
