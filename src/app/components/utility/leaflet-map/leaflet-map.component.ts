import {
  AfterContentInit,
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from 'src/app/app.constants';
import { ExtendedMap } from 'src/app/models/map';
import { MapMarker, MapMarkerObject } from 'src/app/models/mapmarker';
import { Marker } from 'leaflet';
import * as L from 'node_modules/leaflet';
import 'leaflet/dist/leaflet.css';
import { RoutingService } from 'src/app/services/routing.service';
import { CampaignOverview } from 'src/app/models/campaign';

let DefaultIcon = L.icon({
  iconUrl: `${Constants.wikiMediaUrl}/leaflet/marker-icon.png`,
  shadowUrl: `${Constants.wikiMediaUrl}/leaflet/marker-shadow.png`,
  iconSize: [24, 36],
  iconAnchor: [12, 36],
});

@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.scss'],
})
export class LeafletMapComponent implements AfterContentInit {
  @Input() map: ExtendedMap;
  @Input() campaign: CampaignOverview;

  private leafletMap;
  constructor(private router: Router, public routingService: RoutingService) {}

  mouseLatitude: number;
  mouseLongitude: number;
  hideCoordinatesState: boolean = true;

  ngAfterContentInit() {
    /*
     * It is mystifying why this is needed. If this isn't there, leaflet will mess up the initial
     * calculation of the translate3D CSS rule of the .leaflet-image-layer element, which will cause the
     * map to wildly jump around when clicked. Chances are, it's because translate3D is trying to be
     * calculated before the map element is properly initialized and putting this onto another thread
     * forces it to wait for that.
     **/
    setTimeout(() => this.initMap(), 0);
  }

  initMap() {
    this.leafletMap = L.map('leafletMapDiv', {
      crs: L.CRS.Simple,
      minZoom: -1,
      maxZoom: 2,
    });
    this.addMapImage();
    this.addMarkers();
    this.setMapEventListeners();
  }

  setMapEventListeners() {
    //Get the map coordinates of the point the mouse hovers over
    this.leafletMap.on('mousemove', (event) => {
      this.mouseLatitude = event.latlng.lat;
      this.mouseLongitude = event.latlng.lng;
    });

    this.leafletMap.on('click', (event) => {
      const latitude = parseInt(event.latlng.lat);
      const longitude = parseInt(event.latlng.lng);

      const popupContentHTML = this.makeFreePopupContentHTML(
        longitude,
        latitude
      );
      L.popup()
        .setLatLng([latitude, longitude])
        .setContent(popupContentHTML)
        .openOn(this.leafletMap);
    });
  }

  makeFreePopupContentHTML(longitude: number, latitude: number): string {
    const markerMapCreateUrl: string = this.routingService.getRoutePath(
      'marker-map-create',
      {
        latitude: latitude,
        longitude: longitude,
        map_name: this.map.name,
        campaign: this.campaign.name,
      }
    );

    const locationMapCreateUrl: string = this.routingService.getRoutePath(
      'location-map-create',
      {
        latitude: latitude,
        longitude: longitude,
        map_name: this.map.name,
        campaign: this.campaign.name,
      }
    );

    const popupContentHTML: string = `
      <div class="mb-2 pointer"> 
        <a href="${markerMapCreateUrl}">
          <i class="fa fa-map-marker"></i> Add Marker
        </a>
      </div>

      <div class="pointer"> 
        <a href="${locationMapCreateUrl}">
          <i class="fa fa-home"></i> Add Marker and Location
        </a>
      </div>
    `;

    return popupContentHTML;
  }

  addMapImage(): void {
    const bounds: L.LatLngBoundsExpression = [
      [200, 140],
      [800, 1160],
    ];
    L.imageOverlay(this.map.image, bounds).addTo(this.leafletMap);
    this.leafletMap.fitBounds(bounds);
  }

  addMarkers(): void {
    const layers = {};

    // Groups markers into their respective layers
    for (let mapMarker of this.map.markers) {
      const layerName = mapMarker.type_details.name;
      const layer = layers.hasOwnProperty(layerName)
        ? layers[layerName]
        : L.layerGroup();
      layers[layerName] = layer;

      const marker = mapMarker.type_details.is_text_marker
        ? this.createTextMarker(mapMarker)
        : this.createAwesomeMarker(mapMarker);
      marker.addTo(layer);
    }

    // Adds every layer to leaflet map
    for (const layerName in layers) {
      layers[layerName].addTo(this.leafletMap);
    }

    // Add Layer-Control to Leaflet Map
    L.control.layers(null, layers, { sortLayers: true }).addTo(this.leafletMap);
  }

  createTextMarker(mapMarker: MapMarkerObject): Marker {
    const markerColor = this.getMarkerColor(mapMarker);
    const textColor = ['beige', 'lightgreen'].includes(markerColor)
      ? 'black'
      : 'white';
    return L.marker([mapMarker.latitude, mapMarker.longitude], {
      icon: L.divIcon({
        html: `
        <div class="leaflet-text-marker bg-color-${markerColor} text-color-${textColor}">
          <strong>${mapMarker.location_details.name}</strong>
        </div>
        `,
      }),
    })
      .bindPopup(this.getPopupText(mapMarker))
      .bindTooltip(mapMarker.location_details.name);
  }

  getMarkerColor(marker: MapMarker): string {
    if (marker.color) {
      return marker.color;
    } else if (marker.type_details.color) {
      return marker.type_details.color;
    } else {
      return 'grey';
    }
  }

  getPopupText(marker: MapMarker) {
    // Heading and Description
    const locationHeading: string = this.makeLocationHeading(marker);
    const locationDescription: string = this.makeLocationDescription(marker);
    const sublocationList: string = this.makeSublocationList(marker);

    return `${locationHeading} <br> ${locationDescription} <br> ${sublocationList}`;
  }

  makeLocationHeading(marker: MapMarkerObject): string {
    const location_url = this.routingService.getRoutePath('location', {
      campaign: this.campaign.name,
      parent_name: marker.location_details.parent_location_name,
      name: marker.location_details.name,
    });
    const heading: string = `<a href="${location_url}"> <b>${marker.location_details.name}</b> </a>`;
    return heading;
  }

  makeLocationDescription(marker: MapMarkerObject): string {
    let description: string = marker.location_details.description;
    if (description == null) {
      return '';
    }

    let maxDescriptionWordCount = 35;
    let descriptionTooLong: boolean =
      description.split(' ').length >= maxDescriptionWordCount;
    if (descriptionTooLong) {
      let shortenedDescription = description
        .split(' ')
        .slice(0, maxDescriptionWordCount);
      return `${shortenedDescription} ...`;
    }

    return description;
  }

  makeSublocationList(marker: MapMarkerObject): string {
    if (marker.location_details.sublocations.length > 0) {
      const sublocationListHeading =
        '<h5 class="popup-heading"> Locations of Interest: </h5>';

      let sublocationList: string = ' <ul>';
      for (let sublocationName of marker.location_details.sublocations) {
        const sublocationUrl = this.routingService.getRoutePath('location', {
          parent_name: marker.location_details.name,
          name: sublocationName,
          campaign: this.campaign.name,
        });
        sublocationList += `<li><a href="${sublocationUrl}"> ${sublocationName}</a></li>`;
      }
      sublocationList += '</ul>';

      return `${sublocationListHeading} ${sublocationList}`;
    }
    return '';
  }

  createAwesomeMarker(mapMarker: MapMarker): Marker {
    return L.marker([mapMarker.latitude, mapMarker.longitude], {
      icon: this.divIcon(mapMarker),
    })
      .bindPopup(this.getPopupText(mapMarker))
      .bindTooltip(mapMarker.location_details.name);
  }

  divIcon(mapMarker: MapMarker) {
    const typeIcon = mapMarker.type_details.icon;
    const fontawesome_type: string = mapMarker.type_details.fontawesome_type;

    const typeColor = mapMarker.type_details.color;
    const customColor = mapMarker.color;
    const color = customColor ? customColor : typeColor;

    const markerIcon = L.divIcon({
      className: 'custom-div-icon',
      html: `<div style='background-color:${color};' class='marker-pin'></div><i class='d-flex justify-content-center ${fontawesome_type} fa-${typeIcon} awesome'>`,
      iconSize: [30, 42],
      iconAnchor: [15, 42],
      color: color,
    });

    return markerIcon;
  }
}
