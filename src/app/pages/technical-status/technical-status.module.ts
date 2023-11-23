import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TechnicalStatusRoutingModule } from './technical-status-routing.module';
import { ListTechnicalStatusComponent } from './list-technical-status/list-technical-status.component';
import { AddTechnicalStatusComponent } from './add-technical-status/add-technical-status.component';
import { DetailTechnicalStatusComponent } from './detail-technical-status/detail-technical-status.component';
import { EditTechnicalStatusComponent } from './edit-technical-status/edit-technical-status.component';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzTagModule } from 'ng-zorro-antd/tag';


@NgModule({
  declarations: [
    ListTechnicalStatusComponent,
    AddTechnicalStatusComponent,
    DetailTechnicalStatusComponent,
    EditTechnicalStatusComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TechnicalStatusRoutingModule,
    ReactiveFormsModule,
    NzIconModule,
    NzTableModule,
    NzDividerModule,
    NzInputModule,
    NzButtonModule,
    NzSpaceModule,
    NzTypographyModule,
    NzFormModule,
    NzGridModule,
    NzUploadModule,
    NzModalModule,
    NzSelectModule,
    NzImageModule,
    NzAvatarModule,
    NzDatePickerModule,
    NzCheckboxModule,
    NzCardModule,
    NzBreadCrumbModule,
    NzTagModule,
    
  ]
})
export class TechnicalStatusModule { }
