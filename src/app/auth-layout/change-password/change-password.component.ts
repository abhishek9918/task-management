import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiServiceService } from '../../services/api-service.service';

@Component({
  selector: 'app-change-password',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
})
export class ChangePasswordComponent {
  changePasswordForm!: FormGroup;
  passwordsMismatch = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private service: ApiServiceService
  ) {}
  loggedInUser: any;
  LoggedInUserId: any;
  ngOnInit() {
    this.loggedInUser = this.authService.getUserInfo().user;
    this.LoggedInUserId = this.loggedInUser._id;
    this.changePasswordForm = this.fb.group(
      {
        currentPassword: ['', Validators.required],
        newPassword: ['', [Validators.required, Validators.minLength(4)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: this.matchValidator('newPassword', 'confirmPassword'),
      }
    );
  }

  matchValidator(
    controlName: string,
    matchingControlName: string
  ): ValidatorFn {
    return (abstractControl: AbstractControl) => {
      const control = abstractControl.get(controlName);
      const matchingControl = abstractControl.get(matchingControlName);

      if (
        matchingControl!.errors &&
        !matchingControl!.errors?.['passwordsMismatch']
      ) {
        return null;
      }

      if (control!.value !== matchingControl!.value) {
        const error = { passwordsMismatch: 'Passwords do not match.' };
        matchingControl!.setErrors(error);
        return error;
      } else {
        matchingControl!.setErrors(null);
        return null;
      }
    };
  }

  onSubmit() {
    // if (this.changePasswordForm.invalid) {
    //   console.log(
    //     this.changePasswordForm.value,
    //     this.changePasswordForm.controls
    //   );
    //   this.toastr.error('Passwords do not match or invalid input.');
    //   return;
    // }
    if (this.changePasswordForm.invalid) {
      // Specific error handling
      if (this.changePasswordForm.get('newPassword')?.invalid) {
        this.toastr.error(
          'New password is required and must be at least 6 characters.'
        );
      } else if (this.changePasswordForm.get('confirmPassword')?.invalid) {
        this.toastr.error('Confirm password is required.');
      } else if (this.changePasswordForm.errors?.['passwordsMismatch']) {
        this.toastr.error('Passwords do not match.');
      } else {
        this.toastr.error('Please fill in all the fields correctly.');
      }
      return;
    }

    const formData = {
      userId: this.LoggedInUserId,
      oldPass: this.changePasswordForm.value.currentPassword,
      newPass: this.changePasswordForm.value.newPassword,
      confirmPassword: this.changePasswordForm.value.confirmPassword,
    };
    this.updatePassword(formData);
  }

  updatePassword(form: any) {
    const url = 'update_password';
    this.service.post(url, form).subscribe({
      next: (resp) => {
        this.toastr.success('Password changed successfully!');
        this.router.navigate(['/user-dashboard']);
        // this.router.navigate(['/User']);

        console.log(this.loggedInUser, 'ur');
      },
      error: (err) => {
        this.toastr.error('Error changing password.');
      },
    });
  }
}
