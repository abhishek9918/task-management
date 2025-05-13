import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UpdateUserService } from '../../services/update-user.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private _fb: FormBuilder,
    private AuthService: AuthService,
    private userService: UpdateUserService,
    private _toastr: ToastrService
  ) {}
  loginForm!: FormGroup;
  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.loginForm = this._fb.group({
      email: [''],
      password: [''],
    });
  }
  onSubmit() {
    if (!this.loginForm.valid) {
      this._toastr.error('Form is not valid');
    } else {
      const formVal = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };
      this.postUser(formVal);
    }
  }
  postUser(formData: any) {
    this.AuthService.login(formData).subscribe({
      next: (resp: any) => {
        if (resp.data.role === 'ADMIN') {
          this.router.navigate(['/dashboard']);
        } else {
          this.router.navigate(['/change-password']);
        }
      },
      error: (error) => {
        this._toastr.error(error.message);
      },
    });
  }
}
