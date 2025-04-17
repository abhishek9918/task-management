import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ApiServiceService } from '../../services/api-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-users',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './create-users.component.html',
  styleUrl: './create-users.component.scss',
})
export class CreateUsersComponent implements OnInit {
  constructor(
    private router: Router,
    private _fb: FormBuilder,
    private AuthService: AuthService,
    private api: ApiServiceService,
    private activateRoute: ActivatedRoute,
    private datePipe: DatePipe,
    private _toastr: ToastrService
  ) {}
  userForm!: FormGroup;
  routerId: any;
  loggedInUser: any;
  ngOnInit(): void {
    this.routerId = this.activateRoute.snapshot.params['id'];
    this.loggedInUser = this.AuthService.getUserInfo().user;
    if (this.routerId) {
      this.fetchlogginginfo(this.routerId);
    }
    this.initForm();
  }
  initForm() {
    this.userForm = this._fb.group({
      userName: [null],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      role: [null, [Validators.required]],
      status: [null],
    });
  }

  fetchlogginginfo(id: any): void {
    const url = `fetch_user_by_id/${id}`;
    this.api.get(url).subscribe({
      next: (resp) => {
        const { data } = resp;
        if (data) {
          console.log(data);
          this.userForm.patchValue({
            userName: data.userName,
            email: data.email,
            password: data.password,
            role: data.role,
            status: data.status,
            firstName: data.firstName,
            lastName: data.lastName,
          });
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  submitForm() {
    if (!this.userForm.valid) return;
    const updateUser = {
      userName: this.userForm.value.userName,
      _id: this.routerId,
      email: this.userForm.value.email,
      password: this.userForm.value.password,
      role: this.userForm.value.role,
      status: this.userForm.value.status,
      firstName: this.userForm.value.firstName,
      lastName: this.userForm.value.lastName,
      createdBy: this.loggedInUser._id,
    };
    if (this.routerId) {
      this.updateUser(updateUser);
    } else {
      this.postUser(updateUser);
    }
  }

  postUser(formData: any) {
    const url = 'createUserByAdmin';
    this.api.post(url, formData).subscribe({
      next: (resp) => {
        this.router.navigate(['/dashboard/user-list']);
        console.log(resp);
      },
      error: (error) => {},
    });
  }
  updateUser(formData: any) {
    const url = 'update_userByAdmin';
    this.api.put(url, formData).subscribe({
      next: (resp) => {
        this.router.navigate(['/dashboard/user-list']);
        this._toastr.success(resp.message);
        console.log(resp);
      },
      error: (error) => {
        this._toastr.error(error.message);
      },
    });
  }
}
