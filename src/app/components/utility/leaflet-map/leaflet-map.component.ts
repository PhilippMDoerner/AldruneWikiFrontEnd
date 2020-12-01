import { AfterContentInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from 'src/app/app.constants';
import { ExtendedMap } from 'src/app/models/map';
import { MapMarker } from 'src/app/models/mapmarker';
import { Marker } from 'leaflet';
import * as L from "node_modules/leaflet";
import 'leaflet/dist/leaflet.css';

let DefaultIcon = L.icon({
  iconUrl: `${Constants.wikiMediaUrl}/leaflet/marker-icon.png`,
  shadowUrl: `${Constants.wikiMediaUrl}/leaflet/marker-shadow.png`,
  iconSize: [24,36],
  iconAnchor: [12,36]
});

L.Marker.prototype.options.icon = DefaultIcon;


@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.scss']
})
export class LeafletMapComponent implements OnInit, OnDestroy, AfterContentInit {
  @Input() map: ExtendedMap;
  private leafletMap;
  constructor(private router: Router) { }

  mouseLatitude: number;
  mouseLongitude: number;
  hideCoordinatesState: boolean = true;

  ngOnInit(): void {
  }

  ngAfterContentInit(){
    this.initMap();
  }

  initMap(){
    this.leafletMap = L.map('leafletMapDiv', {
      crs: L.CRS.Simple,
      minZoom: -1,
      maxZoom: 2,
    });
    this.addMarkers()
    this.setMapEventListeners();
    this.addMapImage()
  }

  setMapEventListeners(){
    // Get the map coordinates of the point the mouse hovers over
    this.leafletMap.on('mousemove', event => {
      this.mouseLatitude = event.latlng.lat;
      this.mouseLongitude = event.latlng.lng;
    })

    this.leafletMap.on('click', event => {
      const latitude = parseInt(event.latlng.lat);
      const longitude = parseInt(event.latlng.lng);
      const contentHTML: string = `
      <div class="mb-2 pointer"> 
        <a href="${Constants.spaPrefix}/marker/${latitude}/${longitude}/${this.map.name}/create">
          <i class="fa fa-map-marker"></i> Add Marker
        </a>
      </div>

      <div class="pointer"> 
        <a href="${Constants.spaPrefix}/location/${latitude}/${longitude}/${this.map.name}/create">
          <i class="fa fa-home"></i> Add Marker and Location
        </a>
      </div>

    `;

      L.popup()
        .setLatLng([latitude, longitude])
        .setContent(contentHTML)
        .openOn(this.leafletMap);
    })
  }

  routeToAddLocationUrl(latitude: number, longitude: number){
    this.router.navigateByUrl(`${Constants.wikiUrlFrontendPrefix}}/location/${latitude}/${longitude}/create`);
  }

  addMapImage(){
    const bounds: L.LatLngBoundsExpression = [[200, 140], [800, 1160]];
    L.imageOverlay(this.map.image, bounds).addTo(this.leafletMap)
    this.leafletMap.fitBounds(bounds);  
  }

  addMarkers(){
    const layers = {};

    for (let mapMarker of this.map.markers){
      const layerName = mapMarker.type_details.name;
      const layer = (layers.hasOwnProperty(layerName)) ? layers[layerName] : L.layerGroup();  
      layers[layerName] = layer;  

      const marker = (mapMarker.type_details.is_text_marker) ? this.createTextMarker(mapMarker) : this.createDefaultMarker(mapMarker);
      marker.addTo(layer);
    }

    for(const layerName in layers){
      layers[layerName].addTo(this.leafletMap);
    }
    L.control.layers(null, layers, {sortLayers: true}).addTo(this.leafletMap);
  }


  createTextMarker(mapMarker: MapMarker): Marker{
    const markerColor = this.getMarkerColor(mapMarker);
    const textColor = (['beige', 'lightgreen'].includes(markerColor)) ? "black" : "white";
    return L.marker([mapMarker.latitude, mapMarker.longitude], {
      icon: L.divIcon({
        html: `
        <div class="leaflet-text-marker bg-color-${markerColor} text-color-${textColor}">
          <strong>${mapMarker.location_details.name}</strong>
        </div>
        `,
      })
    })
    .bindPopup(this.getPopupText(mapMarker))
    .bindTooltip(mapMarker.location_details.name);
  }

  getMarkerColor(marker: MapMarker): string{
    if (marker.color){
      return marker.color;
    } else if (marker.type_details.color){
      return marker.type_details.color;
    } else {
      return "grey";
    }
  }

  createDefaultMarker(mapMarker: MapMarker): Marker{
    return L.marker([mapMarker.latitude, mapMarker.longitude], {})
    .bindPopup(this.getPopupText(mapMarker))
    .bindTooltip(mapMarker.location_details.name);
  }

  getPopupText(marker: MapMarker){
    // Heading and Description
    const location_url = `${Constants.wikiUrlFrontendPrefix}/location/${marker.location_details.parent_location_name}/${marker.location_details.name}`;
    const heading: string = `<a href="${location_url}"> <b>${marker.location_details.name}</b> </a>`

    let description: string = marker.location_details.description;
    if (description && description.split(" ").length >= 35) description += "...";

    let text: string = `${heading} <br> ${description} <br>`;

    // Add Sublocations
    if (marker.location_details.sublocations.length > 0){
      const subHeading = '<h5 class="popup-heading"> Locations of Interest: </h5>';

      let sublocationList: string = " <ul>";
      for(let sublocationName of marker.location_details.sublocations){
        const sublocation_url = `/location/${marker.location_details.name}/${sublocationName}`;
        sublocationList += `<li><a routerLink="${Constants.wikiUrlFrontendPrefix}/${sublocation_url}"> ${sublocationName}</a></li>`
      }
      sublocationList += '</ul>';

      text += `${subHeading} ${sublocationList}`;
    }

    return text;
  }

  //TODO: Find a way to get Awesome Markers to work
  // fontAwesomeIcon(iconFontawesomeCSSClass: string, color){
  //   if (!iconFontawesomeCSSClass) iconFontawesomeCSSClass = "diamond";
  //   if (!color) color = "blue";

  //   return L.AwesomeMarkers.icon({
  //     icon: 'diamond',
  //     markerColor: 'blue'
  //   })
  // }

  ngOnDestroy(): void{

  }

}
