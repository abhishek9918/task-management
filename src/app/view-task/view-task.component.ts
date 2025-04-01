import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiServiceService } from '../services/api-service.service';
import { AuthService } from '../services/auth.service';
import moment from 'moment';

@Component({
  selector: 'app-view-task',
  imports: [CommonModule],
  templateUrl: './view-task.component.html',
  styleUrl: './view-task.component.scss',
})
export class ViewTaskComponent implements OnInit {
  constructor(
    private router: Router,
    private _fb: FormBuilder,
    private AuthService: AuthService,
    private api: ApiServiceService,
    private activateRoute: ActivatedRoute,
    private datePipe: DatePipe
  ) {}

  viewId: any;
  task: any;
  ngOnInit(): void {
    this.viewId = this.activateRoute.snapshot.params['id'];
    
    this.viewTaskById(this.viewId);
  }
  viewTaskById(id: any) {
    this.api.get('get_task_by_id/' + id).subscribe({
      next: (resp) => {
        const { data } = resp;
        this.task = data;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}
