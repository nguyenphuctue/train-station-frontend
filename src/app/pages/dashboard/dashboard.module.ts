import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarComponent } from './calendar/calendar.component';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { StatisticComponent } from './statistic/statistic.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { FormsModule } from '@angular/forms';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzBadgeModule } from 'ng-zorro-antd/badge';


@NgModule({
  declarations: [
    WelcomeComponent,
    CalendarComponent,
    StatisticComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    NzGridModule,
    NzCardModule,
    NzBreadCrumbModule,
    NzCalendarModule,
    NzCarouselModule,
    NzImageModule,
    NzButtonModule,
    NzIconModule,
    NzBadgeModule,
    
  ]
})
export class DashboardModule { }
