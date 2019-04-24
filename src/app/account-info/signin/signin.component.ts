import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import {SignIn} from './signIn.model';
import {AccountService} from '../account.service';
/* import { Cart } from './../../shared/model/cart.model';
import { Product } from './../../shared/model/product.model'; */

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signInForm: FormGroup;
  signInModel: SignIn;
  pwdError: boolean;
  submitted = false;
  /* cart: Cart;
  productModel: Product[] = []; */
  userId: string;
  cartLocal: any;
  constructor(private fb: FormBuilder, private router: Router, private accountService: AccountService ) { }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.userId = sessionStorage.getItem('userId');
    this.signInForm = this.fb.group({
      mobileNumber: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

onSubmit() {
  this.submitted = true;
  this.signInModel = new SignIn();
  this.signInModel.mobileNumber = this.signInForm.controls.mobileNumber.value;
  this.signInModel.password = this.signInForm.controls.password.value;
  this.accountService.signIn(this.signInModel).subscribe(data => {
    if (!data) {
     this.pwdError = true;
     sessionStorage.setItem('login', 'false');
     sessionStorage.removeItem('userId');
    } else {
      /* this.setCookie(data[0]._id); */
      sessionStorage.setItem('login', 'true');
      sessionStorage.setItem('userId', data.customerId);
      this.router.navigate(['product/shopping']);
     /*  this.logInUserData(); */
    }
  });
}
/* 
logInUserData()   {
  this.userId = sessionStorage.getItem('userId');
  this.cartLocal = JSON.parse(sessionStorage.getItem('cart'));
  if (!this.cartLocal)     {
  } else {
      this.addToCartServer(this.userId, this.cartLocal);
  }
} */
/* addToCartServer(userId, product) {
  this.cart = new Cart();
  this.cart.userId = userId;
  this.cart.product = product;
  this.accountService.addToCart(this.cart).subscribe(data => {
  this.productModel = data;
  }, error => {
    console.log(error);
  });
} */

}
