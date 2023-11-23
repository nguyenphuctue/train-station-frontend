import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListReportComponent } from './list-report/list-report.component';
import { AddReportComponent } from './add-report/add-report.component';
import { DetailReportComponent } from './detail-report/detail-report.component';
import { EditReportComponent } from './edit-report/edit-report.component';

const routes: Routes = [
  {
    path: 'list',
    component: ListReportComponent
  },
  {
    path: 'add',
    component: AddReportComponent
  },
  {
    path: 'detail/:id',
    component: DetailReportComponent
  },
  {
    path: 'edit/:id',
    component: EditReportComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
