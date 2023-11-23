import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '', 
    component: LayoutComponent, 
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('../pages/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'user',
        loadChildren: () => import('../pages/user/user.module').then(m => m.UserModule)
      },
      {
        path: 'train-station',
        loadChildren: () => import('../pages/train-station/train-station.module').then(m => m.TrainStationModule)
      },
      {
        path: 'technical-status',
        loadChildren: () => import('../pages/technical-status/technical-status.module').then(m => m.TechnicalStatusModule)
      },
      {
        path: 'request-repair',
        loadChildren: () => import('../pages/request-repair/request-repair.module').then(m => m.RequestRepairModule)
      },
      {
        path: 'report',
        loadChildren: () => import('../pages/report/report.module').then(m => m.ReportModule)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
