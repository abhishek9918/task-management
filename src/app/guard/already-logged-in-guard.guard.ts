// import { CanActivateFn, Router } from '@angular/router';
// import { inject } from '@angular/core';

// export const alreadyLoggedInGuard: CanActivateFn = (route, state) => {
//   const router = inject(Router);
//   const loggedInUser = localStorage.getItem('LoggedInUser');
//   const currentUser = loggedInUser ? JSON.parse(loggedInUser) : null;

//   if (currentUser && currentUser.token) {
//     if (currentUser.user.role === 'ADMIN') {
//       router.navigate(['/dashboard']);
//     } else if (currentUser.user.role === 'USER') {
//       router.navigate(['/User']);
//     } else if (currentUser.user.role === 'MANAGER') {
//       router.navigate(['/manager']);
//     }
//     return false;
//   } else {
//     return true;
//   }
// };

import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const alreadyLoggedInGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const loggedInUser = localStorage.getItem('LoggedInUser');
  const currentUser = loggedInUser ? JSON.parse(loggedInUser) : null;

  if (currentUser && currentUser.token) {
    const role = currentUser.user?.role;

    const roleRoutes: { [key: string]: string } = {
      ADMIN: '/dashboard',
      USER: '/User',
      MANAGER: '/manager',
    };

    if (role && roleRoutes[role]) {
      router.navigate([roleRoutes[role]]);
    } else {
      router.navigate(['/']); // fallback agar role match na ho
    }

    return false; // prevent access to login/signup
  }

  return true; // allow access if not logged in
};
