import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { regexValidators } from "../validators/validators";

/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {

  mailSent: boolean;
  messageToShow: string;
  credentialsForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public dataProvider: DataProvider, public formBuilder: FormBuilder) {
    this.credentialsForm = this.formBuilder.group({
      email: ['', Validators.compose([
                  Validators.pattern(regexValidators.email),
                  Validators.required])
      ]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
  }

  ionViewWillEnter() {
    this.mailSent = false;
  }

  forgotPassword() {
    this.dataProvider.forgotPassword(this.credentialsForm.value).then((result) => {
      console.log(result);
      if(result.error_msg == '') {
        this.mailSent = true;
        this.messageToShow = result.value;
      }
      else {
        this.messageToShow = 'Error';//result.error_msg;
      }
    });
  }

}
