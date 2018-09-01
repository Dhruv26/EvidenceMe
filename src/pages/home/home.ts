import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from "@ionic-native/geolocation";
import { MapsProvider } from '../../providers/maps/maps';
import { DataProvider } from "../../providers/data/data";
import { CreateReportPage } from '../create-report/create-report';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  userLocation: {
    latitude: number,
    longitude: number
  };

  @ViewChild('map') mapElement: ElementRef;

  constructor(public navCtrl: NavController, public geolocation: Geolocation,
              public mapsProvider: MapsProvider, public dataProvider: DataProvider) {

  }
  
  ionViewDidLoad() {
    setTimeout(() => {
      this.findUserLocation();
    }, 300);
  }

  ionViewWillEnter() {
    
  }

  findUserLocation() {
    let options = {
      enableHighAccuracy: true,
      timeout: 25000
    };
 
    this.geolocation.getCurrentPosition(options).then((position) => {
 
      this.userLocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };
 
      this.mapsProvider.init(this.userLocation, this.mapElement);
 
     }).catch((error) => {
       console.log('Error getting location', error);
     });
     
  }

  createReport() {
    this.navCtrl.push(CreateReportPage);
  }

  openCamera() {
    this.getAllReportLocations();
    this.mapsProvider.placeMarker(this.userLocation, 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png');
  }

  getAllReportLocations() {
    this.dataProvider.getAllReports().then((result) => {
      this.placeAllMarkers(result.location);
    }, (error) => {
      console.log(error);
    });
  }

  placeAllMarkers(locations) {
    for(let loc of locations) {
      console.log(loc);
      this.placeMarker(loc);
    }

  }

  placeMarker(location) {
    this.mapsProvider.placeMarker(location);
  }
  
}
