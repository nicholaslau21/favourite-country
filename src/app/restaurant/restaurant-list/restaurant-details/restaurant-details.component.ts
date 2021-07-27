import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import Map from 'ol/Map';
import { fromLonLat } from 'ol/proj';
import OSM from 'ol/source/OSM';
import View from 'ol/View';
import { Vector } from 'ol/source';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.scss'],
})
export class RestaurantDetailsComponent implements OnInit {
  map: Map;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const [lat, lon] = this.route.snapshot.queryParams.coord.split(',');

    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new VectorLayer({
          source: new Vector({
            features: [
              new Feature({
                geometry: new Point(fromLonLat([lon, lat])),
              }),
            ],
          }),
          style: new Style({
            image: new Icon({
              anchor: [0.5, 46],
              anchorXUnits: 'fraction',
              anchorYUnits: 'pixels',
              src: 'https://openlayers.org/en/latest/examples/data/icon.png',
              color: 'black',
            }),
          }),
        }),
      ],
      view: new View({
        center: fromLonLat([lon, lat]),
        zoom: 17,
      }),
    });
  }
}
