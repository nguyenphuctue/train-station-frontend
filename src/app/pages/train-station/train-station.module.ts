import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TrainStationRoutingModule } from './train-station-routing.module';
import { MapTrainStationComponent } from './map-train-station/map-train-station.component';
import { ListTrainStationsComponent } from './list-train-stations/list-train-stations.component';
import { AddTrainStationComponent } from './add-train-station/add-train-station.component';
import { DetailTrainStationComponent } from './detail-train-station/detail-train-station.component';
import { EditTrainStationComponent } from './edit-train-station/edit-train-station.component';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzFormModule } from 'ng-zorro-antd/form';
import { MapDetailComponent } from './detail-train-station/map-detail/map-detail.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { MapAddComponent } from './add-train-station/map-add/map-add.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { ListHistoryModifiedStationComponent } from './history/list-history-modified-station/list-history-modified-station.component';
import { DetailHistoryModifiedStationComponent } from './history/detail-history-modified-station/detail-history-modified-station.component';
import { MapDetailHistoryComponent } from './history/detail-history-modified-station/map-detail-history/map-detail-history.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzTagModule } from 'ng-zorro-antd/tag';


@NgModule({
  declarations: [
    ListTrainStationsComponent,
    AddTrainStationComponent,
    DetailTrainStationComponent,
    MapDetailComponent,
    MapAddComponent,
    MapTrainStationComponent,
    EditTrainStationComponent,
    ListHistoryModifiedStationComponent,
    DetailHistoryModifiedStationComponent,
    MapDetailHistoryComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    TrainStationRoutingModule,
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
    NzCardModule,
    NzBreadCrumbModule,
    NzTagModule,
    
  ]
})
export class TrainStationModule { }
