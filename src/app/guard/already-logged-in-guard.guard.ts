import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const alreadyLoggedInGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const loggedInUser = localStorage.getItem('LoggedInUser');
  const currentUser = loggedInUser ? JSON.parse(loggedInUser) : null;

  if (currentUser && currentUser.token) {
    router.navigate(['/dashboard']);
    console.log(currentUser);
    // if (resp.data.role === 'ADMIN') {
    //   this.router.navigate(['/dashboard']);
    // } else if (resp.data.USER === 'USER') {
    //   this.router.navigate(['/User']);
    // } else if (resp.data.MANAGER === 'MANAGER') {
    //   this.router.navigate(['/manager']);
    // }
    return false; // Prevent access to login/signup
  } else {
    return true; // Allow access if not logged in
  }
};
