import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegModel } from './registration/registration.model';
import { CardDetailModel } from './card-details/cardDetails.model';
import { AddressModel } from './address/address.model';
import { ProfileModel } from './profile/profile.model';
import { SignIn } from './signin/signIn.model';
import { AppSetting } from './../config/appSetting';
import { Observable, from } from 'rxjs';
/* import { Product } from './../shared/product.model';
import { Order } from './../shared/model/order.model'; */


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  serviceUrl = AppSetting.serviceUrl;
  constructor(private http: HttpClient) { }

  getregForm(holder): Observable<RegModel> {
    const urlway = this.serviceUrl + 'registration';
    return this.http.post<RegModel>(urlway, holder);
  }

  getcardDetails(cardHolder, userId): Observable<CardDetailModel> {
    const urlcard = this.serviceUrl + 'cardupdate/' + userId;
    return this.http.put<CardDetailModel>(urlcard, cardHolder);
  }
  getaddressDetails(addressHolder, userId): Observable<AddressModel> {
    const urladdress = this.serviceUrl + 'addressupdate/' + userId;
    return this.http.put<AddressModel>(urladdress, addressHolder);
  }


  getprofileDetails(profileHolder, userId): Observable<RegModel[]> {
    const urlprofile = this.serviceUrl + 'profileupdate/' + userId;
    return this.http.put<RegModel[]>(urlprofile, profileHolder);
  }
  getCustomerDetails(userId): Observable<RegModel> {
    const urlprofile = this.serviceUrl + 'customerdetail/' + userId;
    return this.http.get<RegModel>(urlprofile);
  }
  customerAddressDelete(userId, addressId): Observable<RegModel> {
    const urlprofile = this.serviceUrl + 'address/' + userId + '/delete/' + addressId;
    return this.http.delete<RegModel>(urlprofile);
  }
  customerAddressUpdate(userId, addressId, updateDetails): Observable<RegModel> {
    const urlprofile = this.serviceUrl + 'address/' + userId + '/update/' + addressId;
    return this.http.put<RegModel>(urlprofile, updateDetails);
  }
  customerCardDelete(userId, cardId): Observable<RegModel> {
    const urlprofile = this.serviceUrl + 'card/' + userId + '/delete/' + cardId;
    return this.http.delete<RegModel>(urlprofile);
  }
  signIn(data: SignIn): Observable<any> {
    const signInurl = 'admin/validate';
    const url: string = this.serviceUrl + signInurl;
    return this.http.post<SignIn>(url, data);
  }
  addToCart(cart): Observable<any> {
    const cartUrl = 'cart';
    const url: string = this.serviceUrl + cartUrl;
    return this.http.post<any>(url, cart);
  }
 /*  getCustomerOrderDetails(userId): Observable<Order> {
    const urlprofile = this.serviceUrl + 'orderdetails/' + userId;
    return this.http.get<Order>(urlprofile);
  } */
}


