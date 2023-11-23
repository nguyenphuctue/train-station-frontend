import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import { fromLonLat, toLonLat, transform } from 'ol/proj';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Draw, Modify } from 'ol/interaction';
import { Style, Stroke, Fill } from 'ol/style';
import Feature from 'ol/Feature';
import Polygon from 'ol/geom/Polygon';

@Component({
  selector: 'app-map-add',
  templateUrl: './map-add.component.html',
  styleUrls: ['./map-add.component.css']
})
export class MapAddComponent implements OnInit {
  map?: Map;

  vectorSource?: any;
  vectorLayer?: any;

  draw?: Draw;
  modify?: Modify;

  selectedFeature?: any;
  selectedMode?: string = "none";

  @Input() locationOfTrainStation: any = {};
  @Input() boundaryOfTrainStation: any = {};
  @Output() locationOfTrainStationChange = new EventEmitter<any>();
  @Output() boundaryOfTrainStationChange = new EventEmitter<any>();

  ngOnInit() {
    this.initializeMap();
    this.initializeInteractions();
  }

  initializeMap() {
    var longitude = 106.29829164309834;
    var latitude = 20.94395459924965;

    //set center of view
    if (this.locationOfTrainStation.coordinates !== null) {
      longitude = this.locationOfTrainStation.coordinates[0];
      latitude = this.locationOfTrainStation.coordinates[1];
    }

    //init map
    this.map = new Map({
      target: 'map-add-station',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: fromLonLat([longitude, latitude]),
        zoom: 10.5
      })
    });

    //set rate of view polygon
    if (this.boundaryOfTrainStation.coordinates !== null) {
      const polygon = new Polygon([this.boundaryOfTrainStation.coordinates]);
      const polygonArea = polygon.getArea();

      const mapSize = this.map?.getSize()!;
      const mapArea = mapSize[0] * mapSize[1];

      const percentage = (polygonArea / mapArea) * 100;
      const desiredZoom = Math.floor(Math.log2(100 / percentage) * 2) / 5;
      console.log(desiredZoom);

      this.map?.getView().setZoom(desiredZoom);
    }

    //init polygon if it is present.
    if (this.boundaryOfTrainStation.coordinates !== null) {
      const polygonFeature = new Feature({
        geometry: new Polygon([this.boundaryOfTrainStation.coordinates]).transform('EPSG:4326', 'EPSG:3857')
      });

      this.vectorSource = new VectorSource({
        features: [polygonFeature]
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
      });

      this.map?.addLayer(this.vectorLayer);
    }
  }

  initializeInteractions() {
    if (this.boundaryOfTrainStation.coordinates === null) {
      this.vectorSource = new VectorSource();
      this.vectorLayer = new VectorLayer({
        source: this.vectorSource
      });
      this.map?.addLayer(this.vectorLayer);
    }

    this.draw = new Draw({
      source: this.vectorSource,
      type: 'Polygon'
    });

    this.modify = new Modify({
      source: this.vectorSource
    });

    this.draw.on('drawend', (event) => {
      const feature: any = event.feature;
      this.setLocationOfTrainStation(feature);
      this.setBoundaryOfTrainStation(feature);
    });

    this.modify.on('modifystart', (event) => {
      this.selectedFeature = event.features.item(0);
    });

    this.modify.on('modifyend', () => {
      this.setLocationOfTrainStation(this.selectedFeature);
      this.setBoundaryOfTrainStation(this.selectedFeature);
    });

  }

  setLocationOfTrainStation(feature: any) {
    const coordinates = feature.getGeometry().getInteriorPoint().getFirstCoordinate();
    const sourceProjection = 'EPSG:3857';
    const targetProjection = 'EPSG:4326';
    const transformedCoordinates = transform(coordinates, sourceProjection, targetProjection);
    this.locationOfTrainStation.coordinates = [transformedCoordinates[0], transformedCoordinates[1]];
    this.locationOfTrainStationChange.emit(this.locationOfTrainStation);
  }

  setBoundaryOfTrainStation(feature: any) {
    const coordinates = feature.getGeometry().getCoordinates()[0];
    const transformedCoordinates = coordinates.map((coord: any) => toLonLat(coord));
    this.boundaryOfTrainStation.coordinates = transformedCoordinates;
    this.boundaryOfTrainStationChange.emit(this.boundaryOfTrainStation);
  }

  changeSelectedMode(mode: string) {
    if (mode === 'none') {
      this.map?.removeInteraction(this.draw!);
      this.map?.removeInteraction(this.modify!);
    } else if (mode === 'draw' && this.boundaryOfTrainStation.coordinates === null) {
      this.map?.removeInteraction(this.modify!);
      this.map?.addInteraction(this.draw!);
    } else if (mode === 'modify') {
      this.map?.removeInteraction(this.draw!);
      this.map?.addInteraction(this.modify!);
    }
  }

}
