import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { DetailUserComponent } from './detail-user/detail-user.component';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';

@NgModule({
  declarations: [
    DetailUserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    NzDescriptionsModule,
    NzGridModule,
    NzAvatarModule,
    NzIconModule,
    NzButtonModule,
    NzCardModule,
    NzBreadCrumbModule,
    
  ]
})
export class UserModule { }
