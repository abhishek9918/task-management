import {
  Component,
  effect,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  output,
  ViewChild,
  viewChild,
} from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService, LoggedInUser } from '../services/auth.service';
import { ApiServiceService } from '../services/api-service.service';
import { HeaderComponent } from '../header/header.component';
import { UpdateUserService } from '../services/update-user.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { SidebarComponent } from '../sidebar/sidebar.component';
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
  selector: 'app-main-layout',
  imports: [RouterOutlet, HeaderComponent, CommonModule, SidebarComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent implements OnInit {
  constructor(
    private router: Router,
    private auth: AuthService,
    private apiService: ApiServiceService,
    private userService: UpdateUserService
  ) {}
  isSidebarOpen: any;
  @ViewChild(SidebarComponent) sidebar!: SidebarComponent;
  @Input() openHideSidebar: boolean = false;

  // isSidebarOpen = false;
  ngOnInit(): void {}
  // toggleSidebar(e: any) {
  // this.openHideSidebar = true;
  // console.log(e);
  // console.log(e);
  // this.isSidebarOpen = e;
  // if (this.sidebar) {
  //   // isSidebarOpen = false;
  // }
  isSideBarOpen: boolean = false;
  sidebarVisible = false;
  // toggleSidebar(e: any) {
  //   console.log(e);
  //   // this.isSideBarOpen = true;
  //   let sidebar = document.getElementById('isSidebar');
  //   if (e === 'Open') {
  //     sidebar?.classList.add('d', 'sidebar-slide', 'sidebar-open');
  //   } else {
  //     sidebar?.classList.remove('d', 'sidebar-closed');
  //   }

  //   console.log(sidebar);
  // }
  toggleSidebar(status: boolean) {
    this.sidebarVisible = status;
  }
  // sidebarVisible = false;
  sidebarClasses = 'sidebar-slide sidebar-closed';

  // toggleSidebar(e: any) {
  //   if (this.sidebarVisible) {
  //     // CLOSE
  //     this.sidebarClasses = 'sidebar-slide sidebar-closed';
  //     this.sidebarVisible = false;
  //   } else {
  //     // OPEN with delay to trigger animation
  //     this.sidebarClasses = 'sidebar-slide sidebar-closed'; // Start hidden
  //     this.sidebarVisible = true;

  //     setTimeout(() => {
  //       this.sidebarClasses = 'sidebar-slide sidebar-open';
  //     }, 10); // tiny delay to allow browser to register the class change
  //   }
  // }
  // toggleSidebar(e: any) {
  //   if (window.innerWidth >= 1024) return; // lg breakpoint = 1024px

  //   this.sidebarVisible = !this.sidebarVisible;

  //   if (this.sidebarVisible) {
  //     this.sidebarClasses = 'sidebar-slide sidebar-closed';
  //     setTimeout(() => {
  //       this.sidebarClasses = 'sidebar-slide sidebar-open';
  //     }, 10);
  //   } else {
  //     this.sidebarClasses = 'sidebar-slide sidebar-closed';
  //   }
  // }
}
