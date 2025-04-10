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

// export const routes: Routes = [
//   {
//     path: '',
//     canActivate: [alreadyLoggedInGuard],
//     component: AuthLayoutComponent,
//     children: [
//       { path: '', redirectTo: 'login', pathMatch: 'full' },
//       { path: 'login', component: LoginComponent },
//       { path: 'sign-up', component: SignUpComponent },
//     ],
//   },
//   {
//     path: 'dashboard',
//     canActivate: [authGuard],
//     component: MainLayoutComponent,
//     children: [
//       { path: '', component: MainDashboardComponent, canActivate: [authGuard] },
//       { path: 'tasks', component: TaskComponent, canActivate: [authGuard] },
//       {
//         path: 'settings',
//         component: SettingsComponent,
//         canActivate: [authGuard],
//       },
//       {
//         path: 'tasks/create',
//         component: CreateTaskComponent,
//         canActivate: [authGuard],
//       },
//       {
//         path: 'tasks/update-task/:id',
//         component: CreateTaskComponent,
//         canActivate: [authGuard],
//       },
//       {
//         path: 'tasks/view-task/:id',
//         component: ViewTaskComponent,
//         canActivate: [authGuard],
//       },
//     ],
//   },
//   {
//     path: '**',
//     redirectTo: 'login',
//     pathMatch: 'full',
//   },
// ];

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
    path: 'dashboard',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: MainDashboardComponent },
      { path: 'tasks', component: TaskComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'tasks/create', component: CreateTaskComponent },
      { path: 'tasks/update-task/:id', component: CreateTaskComponent },
      { path: 'tasks/view-task/:id', component: ViewTaskComponent },
    ],
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];
