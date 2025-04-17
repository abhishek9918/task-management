import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { SignUpComponent } from './auth-layout/sign-up/sign-up.component';
import { LoginComponent } from './auth-layout/login/login.component';
import { MainLayoutComponent } from './dashboard/main-layout.component';
import { MainDashboardComponent } from './dashboard/main-dashboard/main-dashboard.component';
import { TaskComponent } from './task/task.component';
import { SettingsComponent } from './settings/settings.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { authGuard } from './guard/auth.guard';
import { alreadyLoggedInGuard } from './guard/already-logged-in-guard.guard';
import { UsersModule } from './users/users.module';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [alreadyLoggedInGuard],
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    canActivate: [alreadyLoggedInGuard],
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
    ],
  },
];

// { path: '', component: MainDashboardComponent },
// { path: 'tasks', component: TaskComponent },
// { path: 'settings', component: SettingsComponent },
// { path: 'tasks/create', component: CreateTaskComponent },
// { path: 'tasks/update-task/:id', component: CreateTaskComponent },
// { path: 'tasks/view-task/:id', component: ViewTaskComponent },
// { path: '**', redirectTo: 'login', pathMatch: 'full' },
