import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { SignUpComponent } from './auth-layout/sign-up/sign-up.component';
import { LoginComponent } from './auth-layout/login/login.component';
import { MainLayoutComponent } from './dashboard/main-layout.component';
import { MainDashboardComponent } from './dashboard/main-dashboard/main-dashboard.component';
import { TaskComponent } from './task/task.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { authGuard } from './guard/auth.guard';
import { alreadyLoggedInGuard } from './guard/already-logged-in-guard.guard';
import { UsersModule } from './users/users.module';
import { SettingsComponent } from '../SharedComponents/settings/settings.component';
import { ChangePasswordComponent } from './auth-layout/change-password/change-password.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./admin/admin.module').then((m) => m.AdminModule),
      },
      {
        path: 'user-dashboard',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./users/users.module').then((m) => m.UsersModule),
      },
      { path: 'dashboard/settings', component: SettingsComponent },
    ],
  },
];
