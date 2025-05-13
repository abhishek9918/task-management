import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  RouterLink,
  RouterOutlet,
  Router,
  RouterLinkActive,
  NavigationEnd,
} from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { ApiServiceService } from '../services/api-service.service';
import { AuthService, Login } from '../services/auth.service';
import { UpdateUserService } from '../services/update-user.service';
import { filter, Subscription } from 'rxjs';
export interface UserInfo {
  _id: string;
  email: string;
  password: string;
  username: string;
  phone: string;
  profilePicture: string;
  __v: number;
}
@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit, OnDestroy {
  constructor(
    public router: Router,
    private auth: AuthService,
    private apiService: ApiServiceService,
    private userService: UpdateUserService
  ) {
    // this.router.events
    //   .pipe(filter((event) => event instanceof NavigationEnd))
    //   .subscribe(() => {
    //     this.checkTaskRouteActive();
    //   });
  }
  isTaskPageActive = false;
  private checkTaskRouteActive() {
    // Check if the current route matches any route that starts with "/tasks"
    const currentUrl = this.router.url;
    this.isTaskPageActive =
      currentUrl.startsWith('/user-dashboard/view-task-details') ||
      currentUrl.startsWith('/user-dashboard/tasks');
  }
  activeUrl: any;
  loggedInUser: UserInfo | null = null;
  user: any;
  @ViewChild('sidebar') sidebarRef!: ElementRef;
  profilAvtar = 'avatar-3814081_640.png';
  pic: any;
  checkUser: any;
  @Input() isSidebarOpen: boolean = true;
  @Output() isSidebarClicked = new EventEmitter<boolean>();

  // navLinks = [
  //   { path: '/dashboard', label: 'Dashboard', icon: '📊' },
  //   { path: '/dashboard/create-user', label: 'Create User', icon: '➕' },
  //   { path: '/dashboard/user-list', label: 'Users', icon: '👥' },
  //   { path: '/dashboard/manager-list', label: 'Managers', icon: '🧑‍💼' },
  //   { path: '/dashboard/user', label: 'User', icon: '🧑‍💼' },
  // ];
  navLinks = [
    {
      path: '/dashboard',
      label: 'Dashboard',
      icon: 'fa-house',
      roles: ['ADMIN', 'MANAGER'],
    },
    {
      path: '/user-dashboard',
      label: 'Dahboard',
      icon: '➕',
      roles: ['USER'],
    },
    {
      path: '/user-dashboard/task-list',
      label: 'Task',
      icon: 'fa-users',
      roles: ['USER'],
    },
    {
      path: '/dashboard/create-user',
      label: 'Create User',
      icon: 'fa-user',
      roles: ['ADMIN'],
    },
    {
      path: '/dashboard/user-list',
      label: 'Users',
      icon: 'fa-users',
      roles: ['ADMIN'],
    },
    {
      path: '/dashboard/manager-list',
      label: 'Managers',
      icon: 'fa-people-roof',
      roles: ['ADMIN'],
    },
    {
      path: '/dashboard/user',
      label: 'User',
      icon: 'fa-users',
      roles: ['MANAGER'],
    },
    {
      path: '/dashboard/settings',
      label: 'Settings',
      icon: 'fa-gear',
      roles: ['ADMIN', 'MANAGER', 'USER'],
    },
  ];

  private subscription = new Subscription();
  ngOnInit(): void {
    this.loggedInUser = this.auth.getUserInfo().user;
    let _id: any;
    if (this.loggedInUser !== null) {
      _id = this.loggedInUser._id;
      this.fetchlogginginfo(_id);
      this.loginInfo(this.loggedInUser._id);
    }
    this.subscription = this.userService.userProfile$.subscribe((profile) => {
      if (profile) {
        this.fetchlogginginfo(_id);
      }
    });
  }
  loggedInInfo: any;
  loginInfo(id: any) {
    const url = `role-info/${id}`;
    this.apiService.get(url).subscribe({
      next: (resp) => {
        const { data } = resp;
        if (data) {
          this.loggedInInfo = data;
          this.loggedInInfo = Object.keys(data).find((key) => data[key]);
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  loggedInUserDetails: any;
  fetchlogginginfo(id: any): void {
    const url = `fetch_user_by_id/${id}`;
    this.apiService.get(url).subscribe({
      next: (resp) => {
        const { data } = resp;
        if (data) {
          this.loggedInUserDetails = data;
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  openHideSidebar: boolean = false;
  toggleSidebar() {
    this.openHideSidebar = !this.openHideSidebar;
  }
  logout() {
    localStorage.removeItem('LoggedInUser');
    this.router.navigateByUrl('/login');
  }
  collapse: boolean = false;

  url: any = '';
  activeRoute(route: any) {
    this.url = '';
    this.url = route;
  }
  get currentUrl(): string {
    return this.router.url;
  }
}
