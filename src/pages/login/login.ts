import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SignUpPage } from '../sign-up/sign-up';
import { TabsPage } from '../tabs/tabs';
import { Storage } from "@ionic/storage";
import { DataProvider } from '../../providers/data/data';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';


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

  @ViewChild('email') email;
  @ViewChild('password') password;

  client: any;
  wrongPassword: boolean;
  incorrectPasswordMessage: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public storage: Storage, public dataProvider: DataProvider) {
  }

  ionViewDidLoad() {

  }

  ionViewWillEnter() {
    this.wrongPassword = false;
  }

  login() {
    console.log(this.email.value, this.password.value);
    this.dataProvider.login(this.email.value, this.password.value).then((result) => {
      console.log(result);
      if(result.error_msg == '') {
        console.log(result.value.userid)
        this.navCtrl.setRoot(TabsPage);
      }
      else {
        console.log(result.error_msg);
        this.incorrectPasswordMessage = result.error_msg;
        this.wrongPassword = true;
      }
    });
  }

  storeUserInfo() {
    this.storage.set('email', this.email.value);
    this.storage.set('client', this.client);
  }

  goToSignUpPage() {
    this.navCtrl.push(SignUpPage);
  }

  forgotPassword() {
    this.navCtrl.push(ForgotPasswordPage);
  }
}
