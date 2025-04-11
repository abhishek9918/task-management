import {
  Component,
  effect,
  ElementRef,
  OnDestroy,
  OnInit,
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

  // isSidebarOpen = false;
  ngOnInit(): void {}
  toggleSidebar(e: any) {
    console.log(e);
    this.isSidebarOpen = e;

    if (this.sidebar) {
      this.sidebar.toggleSidebar();
      // isSidebarOpen = false;
    }
  }
}
