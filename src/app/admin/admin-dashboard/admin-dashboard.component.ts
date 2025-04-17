import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';
import { ApiServiceService } from '../../services/api-service.service';
import { AuthService } from '../../services/auth.service';
import { UpdateUserService } from '../../services/update-user.service';
@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent implements OnInit {
  constructor(
    private router: Router,
    private auth: AuthService,
    private apiService: ApiServiceService,
    private userService: UpdateUserService
  ) {}

  isSidebarOpen: any;
  @ViewChild(SidebarComponent) sidebar!: SidebarComponent;
  @Input() openHideSidebar: boolean = false;

  ngOnInit(): void {
    this.loggedInUser = this.auth.getUserInfo().user;
    this.fetchUserByAdmin(this.loggedInUser._id);
    this.getAllTasks();
  }

  isSideBarOpen: boolean = false;
  sidebarVisible = false;

  toggleSidebar(status: boolean) {
    this.sidebarVisible = status;
  }
  sidebarClasses = 'sidebar-slide sidebar-closed';

  isloader: boolean = false;
  loggedInUser: any;
  taskArray: any[] = [];
  p: number = 1;
  total: number = 0;
  searchTasked: any[] = [];
  colors: any = ['bg-blue-800', 'bg-green-800', 'bg-red-800', 'bg-yellow-800'];
  countStatus: any;
  analytics: any;
  allUserList: any;
  loginData: any = [];
  fetchUserByAdmin(id: any) {
    const url = `fetchUserByAdminId/${id}`;

    this.apiService.get(url).subscribe({
      next: (resp) => {
        console.warn(resp.data);
        this.loginData = resp.data;
      },
      error: (error) => {
        console.warn(error);
      },
    });
  }

  getAllUserList() {
    this.apiService.get('get_allUsers').subscribe({
      next: (resp) => {
        if (resp) {
          this.allUserList = resp?.data;
        }
      },
      error: (error) => {},
    });
  }

  getGradientClass(type: string): string {
    switch (type) {
      case 'totalTasks':
        return 'bg-gradient-to-r from-indigo-500 to-purple-500';
      case 'totalUsers':
        return 'bg-gradient-to-r from-green-400 to-emerald-500';
      case 'totalManagers':
        return 'bg-gradient-to-r from-blue-400 to-blue-600';
      case 'inActiveUsers':
        return 'bg-gradient-to-r from-red-400 to-rose-500';
      default:
        return 'bg-gray-500';
    }
  }
  getTitle(type: string): string {
    switch (type) {
      case 'totalTasks':
        return 'Total Tasks';
      case 'totalUsers':
        return 'Total Users';
      case 'totalManagers':
        return 'Total Managers';
      case 'inActiveUsers':
        return 'Deactivated Users';
      default:
        return 'Unknown';
    }
  }

  getDescription(type: string): string {
    switch (type) {
      case 'totalTasks':
        return 'Manage tasks assigned to users';
      case 'totalUsers':
        return 'Manage users and roles';
      case 'totalManagers':
        return 'Users assigned as managers';
      case 'inActiveUsers':
        return 'Revoked access users';
      default:
        return '';
    }
  }
  getLabel(type: string): string {
    switch (type) {
      case 'totalTasks':
        return 'Tasks';
      case 'totalUsers':
      case 'totalManager':
      case 'inActiveUsers':
        return 'Users';
      default:
        return '';
    }
  }

  totalTasks: number = 0;

  currentIndex = -1;
  title = '';

  getAllTasks() {
    this.isloader = true;
    const id = this.loggedInUser._id;
    const itemsPerPage = 5;
    const url = `get_all_tasks/${id}?page=${this.p}&limit=${itemsPerPage}`;

    this.apiService.get(url).subscribe({
      next: (resp: any) => {
        this.isloader = false;
        if (resp.success) {
          this.taskArray = resp.data;
          this.searchTasked = [...this.taskArray];
          console.log(this.searchTasked);
          this.total = resp.totalTasks || 0;
        } else {
          this.taskArray = [];
          this.searchTasked = [];
          this.total = 0;
          console.error('Invalid response format:', resp);
        }
      },
      error: (error: any) => {
        this.isloader = false;
        console.error('Error fetching tasks:', error);
      },
    });
  }
}
