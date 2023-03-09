import { SharedModule } from './../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';

const EMPLOYEE_ROUTES: Routes = [
  { path: '', component: EmployeeListComponent },
  { path: 'create', component: EmployeeEditComponent },
  { path: ':id/edit', component: EmployeeEditComponent }
]

@NgModule({
  declarations: [
    EmployeeListComponent,
    EmployeeEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(EMPLOYEE_ROUTES),
    MatFormFieldModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
    SharedModule,
  ]
})
export class EmployeeModule { }
