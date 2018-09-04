import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SignUpPage } from '../sign-up/sign-up';
import { TabsPage } from '../tabs/tabs';
import { Storage } from "@ionic/storage";
import { DataProvider } from '../../providers/data/data';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { regexValidators } from "../validators/validators";


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

  wrongPassword: boolean;
  incorrectPasswordMessage: string;
  credentialsForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public storage: Storage, public dataProvider: DataProvider,
              public formBuilder: FormBuilder) {
    this.credentialsForm = this.formBuilder.group({
      email: ['', Validators.compose([
                  Validators.pattern(regexValidators.email),
                  Validators.required])
      ],
      password: ['', Validators.compose([
                     Validators.pattern(regexValidators.password),
                     Validators.required])
                ]
    });
  }

  ionViewDidLoad() {

  }

  ionViewWillEnter() {
    this.wrongPassword = false;
  }

  login() {
    console.log(this.credentialsForm.value);
    this.dataProvider.login(this.credentialsForm.value).then((result) => {
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

  }

  goToSignUpPage() {
    this.navCtrl.push(SignUpPage);
  }

  forgotPassword() {
    this.navCtrl.push(ForgotPasswordPage);
  }
}
