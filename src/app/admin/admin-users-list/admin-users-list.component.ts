import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faUser,
  faEdit,
  faPlus,
  faTrash,
  faSearch,
  faL,
} from '@fortawesome/free-solid-svg-icons';
import { ApiServiceService } from '../../services/api-service.service';
import { AuthService } from '../../services/auth.service';
import { delay } from 'rxjs';
@Component({
  selector: 'app-admin-users-list',
  imports: [FontAwesomeModule, CommonModule, FormsModule],
  templateUrl: './admin-users-list.component.html',
  styleUrl: './admin-users-list.component.scss',
})
export class AdminUsersListComponent implements OnInit {
  constructor(
    private router: Router,
    private _fb: FormBuilder,
    private AuthService: AuthService,
    private api: ApiServiceService
  ) {}
  faUser = faUser;
  faEdit = faEdit;
  faPlus = faPlus;
  faTrash = faTrash;
  faSearch = faSearch;
  allUserList: any[] = [];
  profilAvtar = 'avatar-3814081_640.png';

  ngOnInit(): void {
    this.getAllUserList();
  }
  getAllUserList() {
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
  editTask(id: any) {
    this.router.navigate(['/dashboard/create-user', id]);
  }
  createTaskForUser(user: any) {
    this.router.navigate(['/dashboard/update-task', user._id]);
    // const userObj = {
    //   id: user._id,
    //   name:
    // }
    //  this.router.navigate(['/products'], { queryParams: { order:  } });
  }
  isloader: boolean = false;
  deleteTask(id: any) {
    this.isloader = true;
    // const url = `delete_task_By_id/${id}`;
    const url = `delete_user_By_id/${id}`;
    this.api
      .delete(url)
      .pipe(delay(200))
      .subscribe({
        next: (resp) => {
          if (resp) {
            this.isloader = false;
            this.getAllUserList();
          }
        },
        error: (error) => {
          this.isloader = false;
          console.error(error);
        },
      });
  }
}
