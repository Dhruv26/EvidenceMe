import { Injectable } from '@angular/core';

declare var google;

/*
  Generated class for the MapsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class MapsProvider {

  map: any;
  marker: any;
  newReportLocation: any;

  constructor() {
    console.log('Hello MapsProvider Provider');
  }

  init(location, element) {
    let latLng = new google.maps.LatLng(location.latitude, location.longitude);
 
    let options = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
 
    this.map = new google.maps.Map(element.nativeElement, options);
  }

  placeMarker(location, icon = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png') {
    let latLng = new google.maps.LatLng(location.latitude, location.longitude);
    this.marker = new google.maps.Marker({
      icon: icon,
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng
    });
  }

  addTouchListener() {
    google.maps.event.addListener(this.map, 'click', (location) => {
      this.placeSingleMarker({latitude: location.latLng.lat(), longitude: location.latLng.lng()});
    });
  }

  placeSingleMarker(location, icon = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png') {
    if(this.marker != null)
      this.marker.setMap(null);
    this.newReportLocation = location;
    this.placeMarker(location, icon);
  }

}