import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { DataProvider } from '../../providers/data/data';

/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  @ViewChild('firstname') firstname;
  @ViewChild('lastname') lastname;
  @ViewChild('email') email;
  @ViewChild('password') password;
  @ViewChild('confirmpassword') confirmpassword;
  @ViewChild('number') phoneNumber;
  @ViewChild('city') city;

  passwordMismatch: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataProvider: DataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }

  ionViewWillEnter() {
    this.passwordMismatch = false;
  }

  signUp() {
    if(this.password == this.confirmpassword) {
      this.dataProvider.signUp(this.firstname.value, this.lastname.value,
                              this.email.value, this.password.value,
                              this.phoneNumber.value, this.city.value).then((result) => {
        console.log(result);
        if(result.error_msg == '') {
          this.navCtrl.setRoot(TabsPage);
        }
      }, (error) => {
        console.log(error);
      });
    }
    else {
      this.passwordMismatch = !this.passwordMismatch;
    }
  }
}
