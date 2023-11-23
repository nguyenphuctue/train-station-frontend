import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListRequestRepairComponent } from './list-request-repair/list-request-repair.component';

const routes: Routes = [
  {
    path: 'list',
    component: ListRequestRepairComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestRepairRoutingModule { }
