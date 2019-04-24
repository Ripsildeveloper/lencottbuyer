import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AppSetting } from '../config/appSetting';
import {Banner} from './banner/banner.model';
import {SuperCategory} from './category-content/category.model';
import {Footer} from './footer/footer.model';
import {Promotion} from './promotion/promotion.model';
import { HotProduct } from './hot-product/hot-product.model';
@Injectable({
  providedIn: 'root'
})
export class HomeService {
  serviceUrl: string = AppSetting.serviceUrl;
  constructor(private httpClient: HttpClient) { }

  // get banners
  getAllBanner(): Observable<any> {
    const categoryUrl = 'banners';
    const url: string = this.serviceUrl + categoryUrl;
    return this.httpClient.get<Banner>(url);
  }
  getSuperCategory(): Observable<any> {
    const categoryUrl = 'categoryDetails';
    const url: string = this.serviceUrl + categoryUrl;
    return this.httpClient.get<SuperCategory>(url);
  }

  // get footer
  getFooterDetails(): Observable<any> {
    const categoryUrl = 'footerDetails';
    const url: string = this.serviceUrl + categoryUrl;
    return this.httpClient.get<Footer>(url);
  }

  // get hot products

  getHotProducts(): Observable<any> {
    const categoryUrl = 'ads';
    const url: string = this.serviceUrl + categoryUrl;
    return this.httpClient.get<HotProduct>(url);
  }

  getAllPromotion(): Observable<any> {
    const categoryUrl = 'promotions';
    const url: string = this.serviceUrl + categoryUrl;
    return this.httpClient.get<Promotion>(url);
  }
}
