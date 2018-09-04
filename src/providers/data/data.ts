import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  baseUrl: string = 'http://localhost:5000/';

  constructor(private http: HttpClient) {
  }

  helloWorld() {
    return new Promise(resolve =>{
      this.http.get(this.baseUrl).subscribe((result) => {
        resolve(result);
      }, (error) => { console.log(error) });
    });
  }

  login(options): Promise<any> {
    let data = new HttpParams().append('email',
                                options.email).append('password', options.password);
    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl + 'login', data).subscribe((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      });
    });
  }

  signUp(options): Promise<any> {
    var data = new HttpParams().append('firstname',
                                options.firstName).append('lastname',
                                options.lastName).append('password',
                                options.password).append('email',
                                options.email).append('phonenum',
                                options.phoneNumber).append('city', options.city);
    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl + 'signup', data).subscribe((result) => {
        resolve(result);
      } , (error) => {
        console.log(error);
        reject(error);
      });
    });
  }

  forgotPassword(options): Promise<any> {
    var data = new HttpParams().append('email', options.email);
    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl + 'forgotpassword', data).subscribe((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      });
    });
  }

  getAllReports(): Promise<any> {
    return new Promise(resolve =>{
      this.http.get(this.baseUrl + 'reports').subscribe((result) => {
        resolve(result);
      }, (error) => { console.log(error) });
    });
  }

  createReport(options): Observable<any> {
    let val: any;
    let err: any;
    var data = new HttpParams().append('description',
                                options.description).append('latitude',
                                options.latitude).append('longitude', 
                                options.longitude).append('type',
                                options.type);
    return this.http.post(this.baseUrl + 'reports', data)
  }

}
