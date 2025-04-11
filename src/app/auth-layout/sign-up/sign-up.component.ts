import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up',
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  constructor(
    private router: Router,
    private _fb: FormBuilder,
    private AuthService: AuthService,
    private _toaster: ToastrService
  ) {}
  registerForm!: FormGroup;
  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.registerForm = this._fb.group({
      userName: [''],
      email: [''],
      password: [''],
    });
  }

  onSubmit() {
    this.postUser(this.registerForm.value);
  }
  postUser(formData: any) {
    this.AuthService.createUser(formData).subscribe({
      next: (resp) => {
        if (resp) {
          this._toaster.success(resp.message);
          this.router.navigate(['/login']);
        }
      },
      error: (error) => {
        this._toaster.error(error.message);
      },
    });
  }
}
