import { Component, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Geolocation } from "@ionic-native/geolocation";
import { MapsProvider } from '../../providers/maps/maps';
import { DataProvider } from '../../providers/data/data';

/**
 * Generated class for the CreateReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-report',
  templateUrl: 'create-report.html',
})
export class CreateReportPage {

  @ViewChild('map') mapElement: ElementRef;
  userLocation: {
    latitude: number,
    longitude: number
  };
  reportLocation: {
    latitude: number,
    longitude: number
  };
  reportForm: FormGroup;
  types = ['Robery', 'Rape', 'Others']

  locationChosen: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public formBuilder: FormBuilder, public geolocation: Geolocation,
              public mapsProvider: MapsProvider, public dataProvider: DataProvider,
              private _cdf: ChangeDetectorRef) {
    this.reportForm = this.formBuilder.group({
      description: ['', Validators.required],
      type: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateReportPage');
    setTimeout(() => {
      this.findUserLocation();
    }, 300);
    console.log(this.reportLocation);
  }

  ionViewWillEnter() {
    
  }

  onTypeChange() {
    this._cdf.detectChanges();
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

      // Initializing the report location to be the same as the user location.
      this.reportLocation = this.userLocation;
      // Initializing the map and marker.
      // Adding a listener to add a marker wherever the user touches the map
      this.mapsProvider.init(this.userLocation, this.mapElement);
      this.mapsProvider.placeSingleMarker(this.userLocation);
      this.mapsProvider.addTouchListener();
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  createReport() {
    this.reportLocation = this.mapsProvider.newReportLocation;
    if(this.reportLocation != undefined &&
      (this.reportLocation.latitude != null && this.reportLocation.longitude != null)) {
      console.log(this.reportForm.value);
      console.log(this.reportLocation);
      this.dataProvider.createReport({description: this.reportForm.value.description,
                                      type: this.reportForm.value.type,
                                      latitude: this.reportLocation.latitude,
                                      longitude: this.reportLocation.longitude}).subscribe((result) => {
        console.log(result);
      }, (error) => {
        console.log(error);
      });
    }
    else {
      console.log(this.reportLocation);
      console.log('undefined location');
      this.locationChosen = false;
    }
  }
}
