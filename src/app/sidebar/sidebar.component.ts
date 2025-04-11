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
} from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { ApiServiceService } from '../services/api-service.service';
import { AuthService } from '../services/auth.service';
import { UpdateUserService } from '../services/update-user.service';
import { Subscription } from 'rxjs';
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
    private router: Router,
    private auth: AuthService,
    private apiService: ApiServiceService,
    private userService: UpdateUserService
  ) {}
  loggedInUser: UserInfo | null = null;
  user: any;
  @ViewChild('sidebar') sidebarRef!: ElementRef;
  profilAvtar = 'avatar-3814081_640.png';
  pic: any;
  checkUser: any;
  // isSidebarOpen: boolean = true;
  @Input() isSidebarOpen: boolean = true;
  @Output() isSidebarClicked = new EventEmitter<boolean>();
  navLinks = [
    { path: '/dashboard', label: 'Dashboard', icon: '📋' },
    { path: '/dashboard/tasks', label: 'Tasks', icon: '📝' },
    { path: '/dashboard/settings', label: 'Settings', icon: '⚙️' },
  ];

  private subscription = new Subscription();
  ngOnInit(): void {
    this.loggedInUser = this.auth.getUserInfo().user;
    let _id: any;
    if (this.loggedInUser !== null) {
      _id = this.loggedInUser._id;
      this.fetchlogginginfo(_id);
    }
    this.subscription = this.userService.userProfile$.subscribe((profile) => {
      if (profile) {
        this.fetchlogginginfo(_id);
      }
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

  navItems = [
    { label: 'Dashboard', link: '/dashboard', icon: '📋' },
    { label: 'Tasks', link: '/dashboard/tasks', icon: '📝' },
    { label: 'Settings', link: '/dashboard/settings', icon: '⚙️' },
  ];

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    console.log('Sidebar Toggled:', this.isSidebarOpen);
  }
  logout() {
    localStorage.removeItem('LoggedInUser');
    this.router.navigateByUrl('/login');
  }
  // @Output() closeSidebar = new EventEmitter<void>();
  // @HostListener('document:click', ['$event'])
  // onDocumentClick(event: MouseEvent): void {
  //   const clickedInside = this.sidebarRef?.nativeElement?.contains(
  //     event.target
  //   );
  //   console.log(clickedInside);
  //   if (!clickedInside && this.isSidebarOpen) {
  //     this.isSidebarOpen = false;
  //   }
  // }
}
