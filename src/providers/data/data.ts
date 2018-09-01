import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  baseUrl: string = 'http://3fe0e550.ngrok.io/';

  constructor(private http: HttpClient) {
  }

  helloWorld() {
    return new Promise(resolve =>{
      this.http.get(this.baseUrl).subscribe((result) => {
        resolve(result);
      }, (error) => { console.log(error) });
    });
  }

  login(email, password): Promise<any> {
    let data = new HttpParams().append('email',
                                email).append('password', password);
    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl + 'login', data).subscribe((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      });
    });
  }

  signUp(firstname, lastname, email, password, number, city): Promise<any> {
    var data = new HttpParams().append('firstname',
                                firstname).append('lastname',
                                lastname).append('password',
                                password).append('email',
                                email).append('phonenum',
                                number).append('city', city);
    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl + 'signup', data).subscribe((result) => {
        resolve(result);
      } , (error) => {
        console.log(error);
        reject(error);
      });
    });
  }

  forgotPassword(email) {
    var data = new HttpParams().append('email', email);
    this.http.post(this.baseUrl + 'forgotpassword', data)
  }

  getAllReports(): Promise<any> {
    return new Promise(resolve =>{
      this.http.get(this.baseUrl + 'reports').subscribe((result) => {
        resolve(result);
      }, (error) => { console.log(error) });
    });
  }

  createReport(description, location) {
    let val: any;
    let err: any;
    var data = new HttpParams().append('desc',
                                description).append('location',
                                location);
    this.http.post(this.baseUrl + 'reports', data).subscribe((data) => {
      val = data;
    }, (error) => {
      err = error;
    });
    return {value: val, error: err};
  }

}
