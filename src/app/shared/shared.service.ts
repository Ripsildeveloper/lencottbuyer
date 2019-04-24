import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AppSetting } from '../config/appSetting';
import { FooterComponent } from './footer/footer.component';
import { Footer } from './footer/footer.model';
import { Header } from './nav/header.model';
import { SuperCategory } from './../shared/model/superCategory.model';


@Injectable({
  providedIn: 'root'
})
export class SharedService {
  serviceUrl: string = AppSetting.serviceUrl;
  constructor(private httpClient: HttpClient) { }

  getSuperCategory(): Observable<any> {
    const categoryUrl = 'categoryDetails';
    const url: string = this.serviceUrl + categoryUrl;
    return this.httpClient.get<SuperCategory>(url);
  }
  getFooterDetails(): Observable<any> {
    const categoryUrl = 'footerDetails';
    const url: string = this.serviceUrl + categoryUrl;
    return this.httpClient.get<Footer>(url);
  }
  getHeaderDetails(): Observable<any> {
    const categoryUrl = 'headerDetails';
    const url: string = this.serviceUrl + categoryUrl;
    return this.httpClient.get<Footer>(url);
  }
  addToQty() {
    let sum = 0;
    if (JSON.parse(sessionStorage.getItem('login'))) {
      return JSON.parse(sessionStorage.getItem('set'));
    } else {
      const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
      cart.map(item => {
        sum += item.length;
      });
      return cart.length;
    }

  }
  getLogin() {
    return JSON.parse(sessionStorage.getItem('login'));
  }
  sessionLogout() {
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('userEmailId');
    sessionStorage.setItem('login', 'false');
    sessionStorage.removeItem('set');

  }
  findName() {
    return sessionStorage.getItem('userEmailId');
  }
}

