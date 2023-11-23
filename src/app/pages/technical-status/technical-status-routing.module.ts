import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListTechnicalStatusComponent } from './list-technical-status/list-technical-status.component';
import { AddTechnicalStatusComponent } from './add-technical-status/add-technical-status.component';
import { DetailTechnicalStatusComponent } from './detail-technical-status/detail-technical-status.component';
import { EditTechnicalStatusComponent } from './edit-technical-status/edit-technical-status.component';

const routes: Routes = [
  {
    path: 'list',
    component: ListTechnicalStatusComponent
  },
  {
    path: 'add',
    component: AddTechnicalStatusComponent
  },
  {
    path: 'detail/:id',
    component: DetailTechnicalStatusComponent
  },
  {
    path: 'edit/:id',
    component: EditTechnicalStatusComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TechnicalStatusRoutingModule { }
