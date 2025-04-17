import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ApiServiceService } from '../../services/api-service.service';

@Component({
  selector: 'app-create-task',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss',
})
export class CreateTaskComponent implements OnInit {
  constructor(
    private router: Router,
    private _fb: FormBuilder,
    private AuthService: AuthService,
    private api: ApiServiceService,
    private activateRoute: ActivatedRoute,
    private datePipe: DatePipe,
    private fb: FormBuilder
  ) {}
  assignedByAuto = true;
  taskForm!: FormGroup;
  users: any[] = [];
  selectedFile: File | null = null;
  routerId: any;

  roleObj: any;

  ngOnInit(): void {
    this.routerId = this.activateRoute.snapshot.params['id'];
    console.log(this.routerId);
    this.initForm();
    this.fetchUsers();
    this.fetchRole();
  }
  fetchRole() {
    const url = 'fetch_role_by_id/';
    const roleId = this.AuthService.getUserInfo().user._id;
    this.api.get(url + roleId).subscribe({
      next: (resp) => {
        console.log(resp.data);
        this.roleObj = resp.data;

        console.log(this.roleObj);
        this.taskForm.patchValue({
          assignBy: resp.data[0]._id,
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  initForm() {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      dueDate: ['', Validators.required],
      priority: ['', Validators.required],
      assignBy: [null],
      status: ['PENDING', Validators.required],
      assignTo: [null],
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  allUserList: any[] = [];
  fetchUsers() {
    this.api.get('get_allUsers').subscribe({
      next: (resp) => {
        console.log(resp.data);
        this.allUserList = resp.data;
        console.log(this.allUserList);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  submitTask() {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }
    const formVal = {
      task: this.taskForm.value.title,
      description: this.taskForm.value.description,
      status: this.taskForm.value.status,
      priority: this.taskForm.value.priority,
      dueDate: this.taskForm.value.dueDate,
      user: this.AuthService.getUserInfo().user,
      assignBy: this.AuthService.getUserInfo().user._id,
      // name: this.AuthService.getUserInfo().user.userName,
      // role: this.AuthService.getUserInfo().user.role,

      assignTo: this.routerId,
    };
    this.createTask(formVal);
  }

  createTask(form: any) {
    this.api.post('create_task', form).subscribe({
      next: (data) => {
        if (data) {
          this.router.navigate(['dashboard/user-list']);
          this.taskForm.reset();
        }
      },
      error: (error) => console.error(error),
    });
  }
}
