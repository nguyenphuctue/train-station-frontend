import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Map, View } from 'ol';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { OSM } from 'ol/source';
import { fromLonLat, } from 'ol/proj.js';
import { TileWMS } from 'ol/source';
import { GEO_API } from 'src/environments/environment';
import GeoJSON from 'ol/format/GeoJSON.js';
import { Style, Fill, Stroke, Icon } from 'ol/style';

@Component({
  selector: 'app-map-detail-history',
  templateUrl: './map-detail-history.component.html',
  styleUrls: ['./map-detail-history.component.css']
})
export class MapDetailHistoryComponent implements OnInit, OnChanges {

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
      target: 'map-detail-history',
      layers: [
        new TileLayer({
          source: new OSM()
        }),
      ],
      view: new View({
        center: fromLonLat([this.trainStation.longitude, this.trainStation.latitude]),
        zoom: 14
      })
    });

    const id = this.trainStation.id;

    this.vectorSource = new VectorSource({
      format: new GeoJSON(),
      url: function (extent) {
        return (
          `${GEO_API.GATEWAY_URL}/jungdo/ows?service=WFS&' +
          'version=1.0.0&request=GetFeature&typeName=jungdo%3Avn_train_stations_history_modified&' +
          'maxFeatures=50&outputFormat=application/json&featureID=${id}`
        );
      }
    });

    this.vectorLayer = new VectorLayer({
      source: this.vectorSource,
      style: new Style({
        stroke: new Stroke({
          color: 'blue',
          width: 2
        }),
        fill: new Fill({
          color: 'rgba(0, 0, 255, 0.2)'
        })
      })
    })

    this.map?.addLayer(this.vectorLayer);
  }

}
