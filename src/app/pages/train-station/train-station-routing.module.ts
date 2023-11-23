import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListTrainStationsComponent } from './list-train-stations/list-train-stations.component';
import { AddTrainStationComponent } from './add-train-station/add-train-station.component';
import { DetailTrainStationComponent } from './detail-train-station/detail-train-station.component';
import { MapTrainStationComponent } from './map-train-station/map-train-station.component';
import { EditTrainStationComponent } from './edit-train-station/edit-train-station.component';
import { ListHistoryModifiedStationComponent } from './history/list-history-modified-station/list-history-modified-station.component';
import { DetailHistoryModifiedStationComponent } from './history/detail-history-modified-station/detail-history-modified-station.component';

const routes: Routes = [
  {
    path: 'map',
    component: MapTrainStationComponent
  },
  {
    path: 'list',
    component: ListTrainStationsComponent
  },
  {
    path: 'add',
    component: AddTrainStationComponent
  },
  {
    path: 'detail/:id',
    component: DetailTrainStationComponent
  },
  {
    path: 'edit/:id',
    component: EditTrainStationComponent
  },
  {
    path: 'history/list',
    component: ListHistoryModifiedStationComponent
  },
  {
    path: 'history/detail/:id',
    component: DetailHistoryModifiedStationComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainStationRoutingModule { }
