import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SignUpPage } from '../sign-up/sign-up';
import { TabsPage } from '../tabs/tabs';
import { Storage } from "@ionic/storage";
import { HttpClient, HttpParams } from "@angular/common/http";
import xmlrpc from 'xmlrpc';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  @ViewChild('username') username;
  @ViewChild('password') password;

  client: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public httpClient: HttpClient) {
  }

  ionViewDidLoad() {

  }

  login() {
    console.log(this.username.value, this.password.value);
    let data = new HttpParams() 
                .append('username', this.username.value)
                .append('password', this.password.value);
    this.httpClient.post('http://localhost:5000/login', data).subscribe((data) => {console.log(data);}, (error) => {console.log(error);});
    //this.navCtrl.setRoot(TabsPage);
  }

  authenticate() {
    this.client.methodCall('Authenticate', [this.username.value, this.password.value],
    function (error, value) {
      console.log('Error: ' + error);
      console.log('Value: ' + value);
    });
  }

  storeUserInfo() {
    this.storage.set('username', this.username.value);
    this.storage.set('client', this.client);
  }

  goToSignUpPage() {
    this.navCtrl.push(SignUpPage);
  }

  forgotPassword() {
    this.httpClient.get('http://localhost:5000').subscribe(data => {
      console.log(data);
    });
  }
}
