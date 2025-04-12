import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ApiServiceService } from '../services/api-service.service';
import { DatePipe } from '@angular/common';
import moment from 'moment';
@Component({
  selector: 'app-create-task',
  imports: [ReactiveFormsModule, FormsModule],
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
    private datePipe: DatePipe
  ) {}
  taskGroup!: FormGroup;
  routerId: any;
  ngOnInit(): void {
    this.initForm();
    this.routerId = this.activateRoute.snapshot.params['id'];
    if (this.routerId) this.getTaskById(this.routerId);
  }

  initForm() {
    this.taskGroup = this._fb.group({
      task: ['', Validators.required],
      status: ['', Validators.required],
      description: ['', Validators.required],
      priority: ['', Validators.required],
      dueDate: ['', Validators.required],
    });
  }
  submit() {
    if (this.taskGroup.invalid) return;
    const formVal = {
      task: this.taskGroup.value.task,
      status: this.taskGroup.value.status,
      description: this.taskGroup.value.description,
      priority: this.taskGroup.value.priority,
      dueDate: this.taskGroup.value.dueDate,
      user: this.AuthService.getUserInfo().user,
    };
    if (this.routerId) {
      this.updateTask(formVal);
    } else {
      this.createTask(formVal);
    }
  }

  createTask(form: any) {
    this.api.post('create_task', form).subscribe({
      next: (data) => {
        if (data) {
          this.router.navigate(['dashboard/tasks']);
          this.taskGroup.reset();
        }
      },
      error: (error) => console.error(error),
    });
  }

  getTaskById(id: any) {
    this.api.get('get_task_by_id/' + id).subscribe({
      next: (resp) => {
        const { data } = resp;
        console.log(moment(data.dueDate).format('DD-MM-yyyy'));
        this.taskGroup.patchValue({
          task: data.task,
          status: data.status,
          description: data.description,
          priority: data.priority,
          dueDate: moment(data.dueDate).format('YYYY-MM-DD'),
        });
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  updateTask(form: any) {
    const url = `update_task/${this.routerId}`;
    this.api.put(url, form).subscribe({
      next: (resp) => {
        const { data } = resp;
        console.log(data);
        this.taskGroup.reset();
        this.router.navigate(['dashboard/tasks']);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
