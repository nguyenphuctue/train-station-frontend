import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { CalendarComponent } from './calendar/calendar.component';
import { StatisticComponent } from './statistic/statistic.component';

const routes: Routes = [
  {
    path: 'welcome',
    component: WelcomeComponent
  },
  {
    path: 'statistic',
    component: StatisticComponent
  },
  {
    path: 'calendar',
    component: CalendarComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
