import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  let loggedInUserDetails = localStorage.getItem('LoggedInUser') as any;
  let currentUser = JSON.parse(loggedInUserDetails);
  if (currentUser && currentUser?.token) {
    
    return true;
  } else {
    router.navigateByUrl('/');
    return false;
  }
};

// if (resp.data.role === 'ADMIN') {
//   this.router.navigate(['/dashboard']);
// } else if (resp.data.USER === 'USER') {
//   this.router.navigate(['/User']);
// } else if (resp.data.MANAGER === 'MANAGER') {
//   this.router.navigate(['/manager']);
// }
