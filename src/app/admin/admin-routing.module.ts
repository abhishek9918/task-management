import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUsersComponent } from './create-users/create-users.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminUsersListComponent } from './admin-users-list/admin-users-list.component';
import { AdminManagersListComponent } from './admin-managers-list/admin-managers-list.component';
import { CreateTaskComponent } from './create-task/create-task.component';

const routes: Routes = [
  { path: '', component: AdminDashboardComponent },
  { path: 'create-user', component: CreateUsersComponent },
  { path: 'create-user/:id', component: CreateUsersComponent },
  { path: 'user-list', component: AdminUsersListComponent },
  { path: 'manager-list', component: AdminManagersListComponent },
  { path: 'manager-list', component: CreateTaskComponent },
  { path: 'create-new-task', component: CreateTaskComponent },
  { path: 'update-task/:id', component: CreateTaskComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
