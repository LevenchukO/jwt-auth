import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable()
export class AuthService {

  constructor(private _http: HttpClient) {
  }

  registration(body: any) {
    return this._http.post(`http://localhost:3010/auth/register`, body, {
      observe: 'body'
    });
  }

  login(body: any) {
    return this._http.post(`http://localhost:3010/auth/login`, body, {
      observe: 'body'
    });
  }

  getUserData() {
    return this._http.get('http://localhost:3010/auth/userdata', {
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('token'))
    });
  }

  getCountries() {
    return this._http.get('http://localhost:3010/auth/getcountries', {
      observe: 'body'});
  }

  getCitiesByCountry(countryId: string) {
    return this._http.get(`http://localhost:3010/auth/cities/${countryId}`, {
      observe: 'body'});
  }

  getZipByCityId(cityId: string) {
    return this._http.get(`http://localhost:3010/auth/zipcodes/${cityId}`, {
      observe: 'body'});
  }

  reqPassReset(body: any) {
    return this._http.post(`http://localhost:3010/auth/recovery-request`, body, {
      observe: 'body'});
  }
}
