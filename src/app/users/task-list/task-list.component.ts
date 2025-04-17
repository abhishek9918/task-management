import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { delay } from 'rxjs';
import { LaoderComponent } from '../../laoder/laoder.component';
import { ApiServiceService } from '../../services/api-service.service';
import { AuthService } from '../../services/auth.service';
import { TaskComponent } from '../../task/task.component';
import { MainDashboardComponent } from '../../dashboard/main-dashboard/main-dashboard.component';

@Component({
  selector: 'app-task-list',
  imports: [CommonModule, LaoderComponent, NgxPaginationModule, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent implements OnInit {
  taskList = [
    {
      _id: '1',
      title: 'Complete UI Design',
      description: 'Finish task list component for user',
      dueDate: '2025-04-18',
      status: 'Pending',
    },
    {
      _id: '2',
      title: 'Review Backend API',
      description: 'Check task API for user-specific listing',
      dueDate: '2025-04-17',
      status: 'Completed',
    },
  ];

  // deleteTask(id: string) {
  //   // call delete API or remove from array
  //   console.log('Deleting task:', id);
  // }
  constructor(
    private router: Router,
    private _fb: FormBuilder,
    private AuthService: AuthService,
    private api: ApiServiceService
  ) {}
  isloader: boolean = false;
  loggedInUser: any;
  taskArray: any[] = [];
  ngOnInit(): void {
    this.loggedInUser = this.AuthService.getUserInfo().user;

    this.getAllTasks();
  }

  totalTasks: number = 0;

  currentIndex = -1;
  title = '';

  p: number = 1;
  total: number = 0;
  searchTasked: any[] = [];
  getAllTasks() {
    this.isloader = true;
    const id = this.loggedInUser._id;
    const itemsPerPage = 5;
    const url = `get_all_tasks/${id}?page=${this.p}&limit=${itemsPerPage}`;

    this.api.get(url).subscribe({
      next: (resp) => {
        this.isloader = false;
        if (resp.success) {
          this.taskArray = resp.data;
          this.searchTasked = [...this.taskArray];
          this.total = resp.totalTasks || 0;

          console.log('taskArray', this.taskArray);
          console.log('search', this.searchTasked);
          console.log('total', this.total);

          // if (this.taskArray.length === 0 && this.p > 1) {
          //   this.p--;
          //   this.getAllTasks();
          // }
        } else {
          this.taskArray = [];
          this.searchTasked = [];
          this.total = 0;
          console.error('Invalid response format:', resp);
        }
      },
      error: (error) => {
        this.isloader = false;
        console.error('Error fetching tasks:', error);
      },
    });
  }

  pageChangeEvent(event: number) {
    this.p = event;
    this.getAllTasks();
  }

  createTask() {
    this.router.navigate(['/dashboard/tasks/create']);
  }
  editTask(item: any) {
    this.router.navigate(['/dashboard/tasks/update-task', item]);
  }

  deleteTask(id: any) {
    this.isloader = true;
    const url = `delete_task_By_id/${id}`;

    this.api
      .delete(url)
      .pipe(delay(200))
      .subscribe({
        next: (resp) => {
          if (resp) {
            this.isloader = false;
            this.getAllTasks();
          }
        },
        error: (error) => {
          this.isloader = false;
          console.error(error);
        },
      });
  }
  searchTerm: any = '';
  filteredTasks: any[] = [];
  taskSearch(event: any) {
    this.searchTerm = event.target.value.trim().toLowerCase();

    if (!this.searchTerm) {
      this.searchTasked = [...this.taskArray];
      return;
    }

    this.searchTask(this.searchTerm);
  }

  searchTask(searchTerm: any) {
    const url = `search_task/${searchTerm}`;
    this.api.get(url).subscribe({
      next: (resp) => {
        if (resp.success && resp.data.length > 0) {
          this.searchTasked = [...resp.data];
          this.total = resp.totalTasks;
        } else {
          this.searchTasked = [];
        }
      },
      error: (error) => {
        console.error('Error fetching tasks:', error);
      },
    });
  }
  sortTask(event: any) {
    console.log(event.target.value);
    const sortVal = event.target.value;
    console.log(sortVal, 'sortVal');
    const url = `sort_task/${sortVal}`;
    this.api.get(url).subscribe({
      next: (resp) => {
        console.log(resp, 'sorted tasks');
      },
      error: (error) => {
        console.error('Error fetching tasks:', error);
      },
    });
  }
  changeStatus(task: any, event: any) {
    // console.log(task, event.target.value);
    const statusObj = {
      status: event.target.value,
      userId: task.user,
      taskId: task._id,
    };
    console.log(statusObj, task);
    const url = 'change_status';
    this.api.post(url, statusObj).subscribe((resp) => {
      if (resp.status === 200) {
        this.getAllTasks();
      }
      console.log(resp);
    });
  }

  viewTask(id: any) {
    this.router.navigate(['user-dashboard/view-task-details/', id]);
  }
}
