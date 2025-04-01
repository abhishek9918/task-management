import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ApiServiceService } from '../services/api-service.service';
import { CommonModule } from '@angular/common';
import { LaoderComponent } from '../laoder/laoder.component';
import { delay } from 'rxjs';
import { PaginationComponent } from '../pagination/pagination.component';
import {
  NgxPaginationModule,
  PaginatePipe,
  PaginationControlsDirective,
} from 'ngx-pagination';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, LaoderComponent, NgxPaginationModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent implements OnInit {
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
          console.log('taskArray', this.taskArray);
          this.searchTasked = [...this.taskArray];
          this.total = resp.totalTasks;

          if (this.taskArray.length === 0 && this.p > 1) {
            this.p--;
            this.getAllTasks();
          }
        } else {
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
}
