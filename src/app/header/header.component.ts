import {
  Component,
  EventEmitter,
  Input,
  input,
  OnInit,
  Output,
  viewChild,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ApiServiceService } from '../services/api-service.service';
import { UpdateUserService } from '../services/update-user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  constructor(
    private router: Router,
    private _fb: FormBuilder,
    private AuthService: AuthService,
    private api: ApiServiceService,
    private userService: UpdateUserService
  ) {}
  // @Input() isClicked: boolean = false;
  @Output() isBtnClick = new EventEmitter<any>();

  user: any;
  ngOnInit(): void {
    // console.log(this.userService.user, 'header updated');
    this.user = this.userService.user();
    console.log(this.user, 'header');
  }
  logout() {
    localStorage.removeItem('LoggedInUser');
    this.router.navigateByUrl('/login');
  }
  openHide: boolean = false;
  click(string: any) {
    if (string === true) {
      this.isBtnClick.emit(true);
      this.openHide = true;
    } else {
      this.isBtnClick.emit(false);
      this.openHide = false;
    }
  }
}
