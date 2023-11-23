import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import { fromLonLat, toLonLat, transform } from 'ol/proj';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source';
import GeoJSON from 'ol/format/GeoJSON.js';
import { Style, Circle, Fill, Stroke, Icon } from 'ol/style';
import Overlay from 'ol/Overlay.js';
import { GEO_API } from 'src/environments/environment';

@Component({
  selector: 'app-map-train-station',
  templateUrl: './map-train-station.component.html',
  styleUrls: ['./map-train-station.component.css']
})
export class MapTrainStationComponent implements OnInit {
  map?: Map;

  vectorLayer?: any;
  vectorSource?: VectorSource;

  ngOnInit() {
    this.initializeMap();
    this.addZoomEventListeners();
  }

  private initializeMap() {

    const container = document.getElementById('popup');
    const content = document.getElementById('popup-content');
    const closer = document.getElementById('popup-closer');

    const raster = new TileLayer({
      source: new OSM(),
    });

    const overlay = new Overlay({
      element: container!,
      autoPan: {
        animation: {
          duration: 250,
        },
      },
    });

    closer!.onclick = function () {
      overlay.setPosition(undefined);
      closer!.blur();
      return false;
    };

    this.map = new Map({
      target: 'map-overview',
      layers: [
        raster
      ],
      overlays: [overlay],
      view: new View({
        center: fromLonLat([106.29829164309834, 20.94395459924965]),
        zoom: 10.5
      })
    });

    this.showPoint();

    const self = this;
    this.map.on('singleclick', function (evt) {
      const coordinate = evt.coordinate;
      const pixel = evt.pixel;
      const features: any = [];

      self.map?.forEachFeatureAtPixel(pixel, function (feature) {
        features.push(feature);
      });

      if (features.length > 0) {
        var firstFeature = features[0];
        var attributes = firstFeature.getProperties();

        var image = '<img src="https://source.unsplash.com/800x600/?train" width="250" height="150">';
        var table = '<table style="display: flex; justify-content: center">';
        
        for (var key in attributes) {
          if (attributes.hasOwnProperty(key) && typeof attributes[key] !== 'object') {
            var value = attributes[key];
            if(key === 'thumbnail_url'){
              image = '<img src="' + value + '" width="250" height="150">';
              console.log(image);
              
            }
            if(key === 'name_station'){
              table += '<tr><th style="text-align: left;">Name:</th><td>' + value + '</td></tr>';
            }
            if(key === 'address'){
              table += '<tr><th style="text-align: left;">Address:</th><td>' + value + '</td></tr>';
            }
          }
        }
        table += '<tr><th style="text-align: left;"></th><td><a href="/train-station/detail/' + firstFeature.getId().split(".")[1] + '">&#8505;</a></td></tr>';
        table += '</table>';

        content!.innerHTML = image + table;
        overlay.setPosition(coordinate);
      }
    });
  }

  addZoomEventListeners() {
    this.map?.getView().on('change:resolution', () => {
      const currentResolution = this.map?.getView().getResolution();
      if (currentResolution! >= 3) {
        this.showPoint();
      } else {
        this.showPolygon();
      }
    });
  }

  showPolygon() {
    if (this.vectorLayer !== undefined) {
      this.map?.removeLayer(this.vectorLayer);
    }

    this.vectorSource = new VectorSource({
      format: new GeoJSON(),
      url: function (extent) {
        return (
          GEO_API.GATEWAY_URL + '/jungdo/ows?service=WFS&' +
          'version=1.0.0&request=GetFeature&typeName=jungdo%3Avn_train_stations&' +
          'maxFeatures=50&outputFormat=application/json'
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

  showPoint() {
    if (this.vectorLayer !== undefined) {
      this.map?.removeLayer(this.vectorLayer);
    }

    this.vectorSource = new VectorSource({
      format: new GeoJSON(),
      url: function (extent) {
        return (
          GEO_API.GATEWAY_URL + '/jungdo/ows?service=WFS&' +
          'version=1.0.0&request=GetFeature&typeName=jungdo%3Avn_train_stations_point&' +
          'maxFeatures=50&outputFormat=application/json'
        );
      }
    });

    this.vectorLayer = new VectorLayer({
      source: this.vectorSource,
      style: new Style({
        image: new Icon({
          src: 'https://openlayers.org/en/latest/examples/data/icon.png',
          anchor: [0.5, 1],
        })
      })
    })

    this.map?.addLayer(this.vectorLayer);
  }

}
