import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Map, View } from 'ol';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { OSM } from 'ol/source';
import { fromLonLat, toLonLat } from 'ol/proj.js';
import { TileWMS } from 'ol/source';
import { GEO_API } from 'src/environments/environment';

@Component({
  selector: 'app-map-detail',
  templateUrl: './map-detail.component.html',
  styleUrls: ['./map-detail.component.css']
})
export class MapDetailComponent implements OnInit, OnChanges {

  map?: Map;
  vectorLayer?: any;
  vectorSource?: VectorSource;

  @Input() trainStation: any;

  ngOnChanges(changes: SimpleChanges): void {
    if (Object.keys(this.trainStation).length !== 0) {
      this.initializeMap();
    }
  }

  ngOnInit(): void {
  }

  initializeMap() {
    this.map = new Map({
      target: 'map-detail',
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        new TileLayer({
          // extent: [-13884991, 2870341, -7455066, 6338219],
          source: new TileWMS({
            url: GEO_API.GATEWAY_URL + '/wms',
            params: { 'LAYERS': 'jungdo:vn_train_stations', 'TILED': true },
            serverType: 'geoserver',
            transition: 0,
          }),
        }),
      ],
      view: new View({
        center: fromLonLat([this.trainStation.longitude, this.trainStation.latitude]),
        zoom: 14
      })
    });
  }

}
