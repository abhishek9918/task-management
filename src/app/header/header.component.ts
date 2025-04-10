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

@Component({
  selector: 'app-header',
  imports: [],
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
  @Output() isBtnClick = new EventEmitter<string>();

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
  click() {
    this.isBtnClick.emit('clicked');
  }
}
