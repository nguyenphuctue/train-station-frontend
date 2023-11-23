import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IconsProviderModule } from '../icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { SiderComponent } from './sider/sider.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';


@NgModule({
  declarations: [
    SiderComponent,
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    FormsModule,
    HttpClientModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzAvatarModule,
    NzBadgeModule,
    NzDropDownModule
  ],
  exports: [LayoutComponent]
})
export class LayoutModule { }
