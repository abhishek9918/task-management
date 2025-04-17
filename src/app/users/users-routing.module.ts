import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { TaskListComponent } from './task-list/task-list.component';
// import { ViewTaskComponent } from '../view-task/view-task.component';
import { ViewTaskComponent } from './view-task/view-task.component';

const routes: Routes = [
  { path: '', component: UsersComponent },
  { path: 'user', component: UsersComponent },
  { path: 'task-list', component: TaskListComponent },
  { path: 'view-task-details', component: ViewTaskComponent },
  { path: 'view-task-details/:id', component: ViewTaskComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
