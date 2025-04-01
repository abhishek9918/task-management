import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UpdateUserService {
  constructor() {}
  user = signal<any>(null);
  isUserlogged = signal<any>(false);
  private userProfileSubject = new BehaviorSubject<any>(null);
  userProfile$ = this.userProfileSubject.asObservable();

  setUser(updateUser: any) {
    this.user.set(updateUser);
  }
  checkUserLogin(isLogged: boolean) {
    this.isUserlogged.set(isLogged);
  }
  updateUserProfile(profile: any) {
    this.userProfileSubject.next(profile);
  }
}
