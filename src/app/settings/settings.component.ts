import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from '../services/api-service.service';
import { AuthService, LoggedInUser } from '../services/auth.service';
import moment from 'moment';
import { UpdateUserService } from '../services/update-user.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent implements OnInit {
  imageSrc: string | ArrayBuffer | null = null;
  constructor(
    private router: Router,
    private _fb: FormBuilder,
    private AuthService: AuthService,
    private api: ApiServiceService,
    private updateService: UpdateUserService,
    private _toastr: ToastrService
  ) {}
  userName: any = null;
  loggedInUser: any;
  LoggedInUserId: any;
  profileForm!: FormGroup;
  passwordFormGroup!: FormGroup;
  selectedFile: any = null;
  profilePreview: any = null;
  profilAvtar = 'avatar-3814081_640.png';
  loggedInUserDetails: any;
  ngOnInit(): void {
    this.initForm();
    this.loggedInUser = this.AuthService.getUserInfo().user;
    this.LoggedInUserId = this.loggedInUser._id;
    if (this.LoggedInUserId) {
      this.fetchlogginginfo(this.LoggedInUserId);
    }
  }
  initForm() {
    this.profileForm = this._fb.group({
      profile: [null],
      userName: [null, Validators.required],
    });
    this.passwordFormGroup = this._fb.group({
      old_password: [],
      new_password: [],
    });
  }
  fetchlogginginfo(id: any): void {
    const url = `fetch_user_by_id/${id}`;
    this.api.get(url).subscribe({
      next: (resp) => {
        const { data } = resp;
        if (data) {
          this.loggedInUserDetails = data;
          this.profileForm.patchValue({
            userName: this.loggedInUserDetails.userName,
            profile: this.loggedInUserDetails.profilePicture,
          });
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  onImageChange(event: any): void {
    const file = event.target.files[0];

    if (file) {
      const fileType = file.type;
      const fileSize = file.size / 1024 / 1024; // in MB
      // Validate file type and size
      if (!['image/jpeg', 'image/png'].includes(fileType)) {
        this._toastr.error('Only JPG and PNG formats are allowed');
        return;
      }
      if (fileSize > 1) {
        this._toastr.error('File size should be less than 1MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target && e.target.result) {
          this.selectedFile = event.target.files[0];

          if (e.target.result) {
            this.profilePreview = e.target.result;
          }
        }
      };
      reader.readAsDataURL(file);
    }
  }
  pic = null;
  updateProfile(formData: any) {
    this.api.uploadFile('update_profile', formData, true).subscribe({
      next: (resp) => {
        this.updateService.updateUserProfile(true);
        if (resp) {
          this.updateService.setUser(resp.data);
          this._toastr.success(resp.message);
        }
      },
      error: (err) => {
        console.error(err, 'updateProfile err');
        this._toastr.error(err.message);
      },
    });
  }
  onSubmit() {
    if (!this.profileForm.valid) {
      return;
    }

    const formData = new FormData();
    if (this.selectedFile) {
      formData.append('upload_file', this.selectedFile);
    } else {
      formData.append('profile', this.loggedInUserDetails.profilePicture);
    }
    // formData.append('upload_file', this.selectedFile);
    formData.append('userId', this.LoggedInUserId);
    formData.append('userName', this.profileForm.value.userName);
    this.updateProfile(formData);
  }

  updatePassword(e: any) {
    if (this.passwordFormGroup.valid) {
      const form = {
        userId: this.LoggedInUserId,
        oldPass: this.passwordFormGroup.value.old_password,
        newPass: this.passwordFormGroup.value.new_password,
      };
      const url = 'update_password';
      this.api.post(url, form).subscribe({
        next: (resp) => {
          this._toastr.success(resp.message);
        },
        error: (err) => {
          this._toastr.success(err.message);
        },
      });
    }
  }
}
