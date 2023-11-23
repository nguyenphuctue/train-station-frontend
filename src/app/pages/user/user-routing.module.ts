import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailUserComponent } from './detail-user/detail-user.component';

const routes: Routes = [
  {
    path: 'detail',
    component: DetailUserComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
