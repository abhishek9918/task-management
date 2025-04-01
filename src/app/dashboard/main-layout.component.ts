import { Component, effect, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService, LoggedInUser } from '../services/auth.service';
import { ApiServiceService } from '../services/api-service.service';
import { HeaderComponent } from '../header/header.component';
import { UpdateUserService } from '../services/update-user.service';
import { CommonModule } from '@angular/common';
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
  selector: 'app-main-layout',
  imports: [RouterLink, RouterOutlet, HeaderComponent, CommonModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private auth: AuthService,
    private apiService: ApiServiceService,
    private userService: UpdateUserService
  ) {}
  loggedInUser: UserInfo | null = null;
  user: any;

  profilAvtar = 'avatar-3814081_640.png';
  pic: any;
  checkUser: any;
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
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
