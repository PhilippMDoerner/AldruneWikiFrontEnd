import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ExtendedMap } from 'src/app/models/map';
import { MapService } from 'src/app/services/map.service';
import * as L from "node_modules/leaflet";
import { MapMarker } from 'src/app/models/mapmarker';

//Bugfixing leaflet not grabbing its shadow-image file properly
import "leaflet/dist/images/marker-shadow.png";
import { Router } from '@angular/router';


@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.scss']
})
export class LeafletMapComponent implements OnInit, OnDestroy, AfterViewInit{
  @Input() map: ExtendedMap;
  private leafletMap;
  constructor(private router: Router) { }

  mouseLatitude: number;
  mouseLongitude: number;
  hideCoordinatesState: boolean = true;

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.initMap();
  }

  initMap(){
    console.log(L.Icon.Default.prototype._getIconUrl())
    this.leafletMap = L.map('leafletMapDiv', {
      crs: L.CRS.Simple,
      minZoom: -1,
      maxZoom: 2,
    });
    this.addMarkers()
    this.setMapEventListeners();
    this.addMapImage()

    L.popup()
      .setLatLng([200, 140])
      .setContent("Walumba")
      .openon(this.leafletMap)
  }

  setMapEventListeners(){
    // Get the map coordinates of the point the mouse hovers over
    this.leafletMap.on('mousemove', event => {
      this.mouseLatitude = event.latlng.lat;
      this.mouseLongitude = event.latlng.lng;
    })

    this.leafletMap.on('click', event => {
      const latitude = event.latlng.lat;
      const longitude = event.latlng.lng;
      const contentHTML: string = `
      <div class="mb-2 pointer"> 
        <a href="/marker/${latitude}/${longitude}/${this.map.name}/create">
          <i class="fa fa-map-marker"></i> Add Marker
        </a>
      </div>

      <div class="pointer"> 
        <a href="/location/${latitude}/${longitude}/${this.map.name}/create">
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
    this.router.navigateByUrl(`/location/${latitude}/${longitude}/create`);
  }

  addMapImage(){
    const bounds: L.LatLngBoundsExpression = [[200, 140], [800, 1160]];
    L.imageOverlay(this.map.image, bounds).addTo(this.leafletMap)
    this.leafletMap.fitBounds(bounds);  
  }

  addMarkers(){
    for (let mapMarker of this.map.markers){
      if (mapMarker.type_details.is_text_marker){
        this.addTextMarkerToMap(mapMarker);
      } else{
        this.addDefaultMarkerToMap(mapMarker);
      }
    }
  }

  addTextMarkerToMap(mapMarker: MapMarker){
    console.log(mapMarker);
    const markerColor = this.getMarkerColor(mapMarker);
    const textColor = (['beige', 'lightgreen'].includes(markerColor)) ? "black" : "white";
    L.marker([mapMarker.latitude, mapMarker.longitude], {
      icon: L.divIcon({
        html: `
        <div class="leaflet-text-marker bg-color-${markerColor} text-color-${textColor}">
          <strong>${mapMarker.location_details.name}</strong>
        </div>
        `,
      })
    })
    .addTo(this.leafletMap)
    .bindPopup(this.getPopupText(mapMarker))
    .bindTooltip(mapMarker.location_details.name);
  }

  getMarkerColor(marker: MapMarker){
    if (marker.color){
      return marker.color;
    } else if (marker.type_details.color){
      return marker.type_details.color;
    } else {
      return "grey";
    }
  }

  addDefaultMarkerToMap(mapMarker: MapMarker){
    L.marker([mapMarker.latitude, mapMarker.longitude], {})
    .addTo(this.leafletMap)
    .bindPopup(this.getPopupText(mapMarker))
    .bindTooltip(mapMarker.location_details.name);
  }

  //TODO: Write into every model a "get_absolute_url" method and use that for url generation everywhere
  getPopupText(marker: MapMarker){
    // Heading and Description
    const location_url = `/location/${marker.location_details.parent_location_name}/${marker.location_details.name}`;
    const heading: string = `<a href="${location_url}"> <b>${marker.location_details.name}</b> </a>`

    let description: string = marker.location_details.description;
    if (description.split(" ").length >= 35) description += "...";

    let text: string = `${heading} <br> ${description} <br>`;

    // Add Sublocations
    if (marker.location_details.sublocations.length > 0){
      const subHeading = '<h5 class="popup-heading"> Locations of Interest: </h5>';

      let sublocationList: string = " <ul>";
      for(let sublocationName of marker.location_details.sublocations){
        const sublocation_url = `/location/${marker.location_details.name}/${sublocationName}`;
        sublocationList += `<li><a routerLink='${sublocation_url}'> ${sublocationName}</a></li>`
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
