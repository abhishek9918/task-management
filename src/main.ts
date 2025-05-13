import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);

// if (currentUser && currentUser.token) {
//   router.navigate(['/dashboard']);
//   console.log(currentUser);
//   // if (resp.data.role === 'ADMIN') {
//   //   this.router.navigate(['/dashboard']);
//   // } else if (resp.data.USER === 'USER') {
//   //   this.router.navigate(['/User']);
//   // } else if (resp.data.MANAGER === 'MANAGER') {
//   //   this.router.navigate(['/manager']);
//   // }
//   return false; // Prevent access to login/signup
// } else {
//   return true; // Allow access if not logged in
// }
