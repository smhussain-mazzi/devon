import { EmployeeService } from './../employee.service';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, of, Subscription, switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Employee } from 'src/app/employee/employee';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss']
})
export class EmployeeEditComponent {
  public form: FormGroup = new FormGroup({

    id: new FormControl(''),

    name: new FormControl<string>('', [Validators.required, Validators.maxLength(60)]),

    code: new FormControl<string>('', [Validators.required, Validators.maxLength(60)]),

    dateOfBirth: new FormControl<string>('', [Validators.required]),

    address: new FormControl<string>('', [Validators.required, Validators.maxLength(100)])
  });
  private id?: string;
  loading = false;
  private subscription: Subscription = new Subscription();
  constructor(
    private route: ActivatedRoute,
    private service: EmployeeService,
    private router: Router,
    private snackbarService: MatSnackBar) {
  }

  ngOnInit() {

    this
      .route
      .params
      .pipe(
        map(p => p['id']),
        switchMap(id => {
          if (id) {
            this.id = id;
            return this.service.getEmployee(id);
          }
          return of(new Employee());
        })
      )
      .subscribe(
        {
          next: result => {
            this.form.patchValue(result);
          },
          error: err => {
            this.snackbarService.open('Error while loading!!!', 'Dismiss');
          }
        }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  public hasError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }
  onSubmit() {
    const value = this.form.value;
    this.service.addEmployee(value).subscribe(
      {
        next: () => {
          this.router.navigate(['/employee']);
        },
        error: error => {
          this.snackbarService.open('An error occured while saving!!!', 'Dismiss');
        }
      });
  }
}
