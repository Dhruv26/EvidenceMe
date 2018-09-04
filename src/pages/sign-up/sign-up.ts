import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { DataProvider } from '../../providers/data/data';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { regexValidators } from "../validators/validators";

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

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' },
      { type: 'validUsername', message: 'Your username has already been taken.' }
    ],
    'firstName': [
      { type: 'required', message: 'First Name is required.' }
    ],
    'lastName': [
      { type: 'required', message: 'Last Name is required.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.'},
      { type: 'pattern', message: 'Passwords should be at least 8 characters long and contain one number, one character and one special character.'}
    ],
    'phoneNumber': [
      { type: 'required', message: 'Phone number is required.'},
      { type: 'minlength', message: 'Phone number should have at least 10 numbers.'},
      { type: 'maxlength', message: 'Phone number should have at the most 13 characters.'}
    ],
    tncCheckbox: [
      { type: 'required', message: 'Please check to continue.'}
    ]
  }

  passwordMismatch: boolean;
  credentialsForm: FormGroup;
  tncCheckbox: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public dataProvider: DataProvider, public formBuilder: FormBuilder) {
   console.log('Constructor called')
    this.credentialsForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.compose([
                  Validators.pattern(regexValidators.email),
                  Validators.required])
      ],
      password: ['', Validators.compose([
                    Validators.pattern(regexValidators.password),
                    Validators.required])
      ],
      confirmPassword: ['', Validators.required],
      phoneNumber: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(13),
                    Validators.required])],
      city: [''],
      tncCheckbox: [false, Validators.requiredTrue]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }

  ionViewWillEnter() {
    this.passwordMismatch = false;
    this.tncCheckbox = false;
  }

  signUp() {
    if(this.credentialsForm.value.password == this.credentialsForm.value.confirmpassword) {
      this.dataProvider.signUp(this.credentialsForm.value).then((result) => {
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
    console.log(this.credentialsForm.value);
  }

  checkboxClicked() {
    this.tncCheckbox = !this.tncCheckbox;
    console.log('checkbox');
  }
}
