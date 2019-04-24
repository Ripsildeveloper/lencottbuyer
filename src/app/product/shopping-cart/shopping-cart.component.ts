import { Component, OnInit } from '@angular/core';
import { ProductService } from './../product.service';
import { Product } from '../../shared/model/product.model';
import { Cart } from './../../shared/model/cart.model';
import { initNgModule } from '@angular/core/src/view/ng_module';
import {MOQ} from '../../shared/model/moq.model';
import { Router } from '@angular/router';
import { AppSetting } from '../../config/appSetting';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  shopModel: any = [];
  cartModel: Cart;
  userId;
  moqModel: MOQ;
  productImageUrl: string = AppSetting.productImageUrl;
  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit() {
    if (JSON.parse(sessionStorage.getItem('login'))) {
      this.userId = sessionStorage.getItem('userId');
      this.shoppingCartUser(this.userId);
    } else {
      this.shopModel = JSON.parse(sessionStorage.getItem('cart')) || [];
    }
  }
  /* action(event, item) {
    if (JSON.parse(sessionStorage.getItem('login'))) {
      switch (event) {
        case 'add':
          this.addToCartServer(this.userId, item);
          break;
        case 'min':
          item.set--;
          if (item.set === 0) {
            this.removeCart(this.userId, item);
          } else {
            this.minusCart(this.userId, item);
          }
          break;
        case 'clear':
          this.removeCart(this.userId, item);
          break;
        default:
          break;
      }
    } else {
      switch (event) {
        case 'add':
          item.set++;
          item.subTotal = item.price * item.set;
          sessionStorage.setItem('cart', JSON.stringify(this.shopModel));
          break;
        case 'min':
          item.set--;
          item.subTotal = item.price * item.set;
          sessionStorage.setItem('cart', JSON.stringify(this.shopModel));
          if (item.set === 0) {
            this.clearFromCart(item);
          }
          break;
        case 'clear':
          this.clearFromCart(item);
          break;
        default:
          break;
      }
    }
  } */
  actionPlus(product, productSkuCode, productMoq) {
    const totalItem: any = [];
    const cart = {
      productId: product,
      skuCode: productSkuCode,
      moq: productMoq,
      set: 1
    };
    totalItem.push(cart);
    this.cartModel = new Cart();
    this.cartModel.userId = this.userId;
    this.cartModel.skuDetail = totalItem;
    this.productService.addToCart(this.cartModel).subscribe(data => {
      this.shopModel = data;
      this.total();
    }, error => {
      console.log(error);
    });
  }
  actionMinus(product, productSkuCode, productMoq) {
    const cart: any = {
      productId: product,
      skuCode: productSkuCode,
      moq: productMoq,
      set: 1
    };
    this.cartModel = new Cart();
    this.cartModel.userId = this.userId;
    this.cartModel.skuDetail = cart;
    this.productService.addToCartDecrement(this.cartModel).subscribe(data => {
      this.shopModel = data;
      this.total();
    }, error => {
      console.log(error);
    });
  }
  clearFromCart(product) {
    const item = this.shopModel.find(ite => {
      return ite.productId === product.productId;
    });
    const index = this.shopModel.indexOf(item);
    this.shopModel.splice(index, 1);
    sessionStorage.setItem('cart', JSON.stringify(this.shopModel));
  }
  total() {
    let sum = 0;

    if (JSON.parse(sessionStorage.getItem('login'))) {
      this.totalQty();
    } else {
      const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
      cart.map(item => {
        sum += item.set * item.moq * item.price;
      });
      return sum;
    }
  }
  totalQty() {
    let set = 0;
    const totalSet = this.shopModel.map(item => item.skuDetail);
    totalSet.map(item => {
      set += item.set;
    });
    sessionStorage.setItem('set', JSON.stringify(set));
  }
  shoppingCartUser(userId) {
    this.productService.shoppingUser(userId).subscribe(data => {
    this.shopModel = data;
    sessionStorage.setItem('samplecart', JSON.stringify(this.shopModel));
    this.total();
    }, err => {
      console.log(err);
    });
  }

 /*  minusCart(userId, product) {
    const item: any = {
      productId: product.productId,
      productName: product.productName,
      productDescription: product.productDescription,
      productImageName: product.productImageName,
      price: product.price,
      subTotal: product.price * 1,
      set: 1
    };
    this.cart = new Cart();
    this.cart.userId = userId;
    this.cart.skuDetail = item;
    this.productService.addToCartMinus(this.cart).subscribe(data => {
      this.shopModel = data;
    }, err => {
      console.log(err);
    });
  } */
  /*   reduceCart(proId) {
     this.productService.reduceToCart(proId).subscribe(data => {
       this.shopModel = data;
       localStorage.setItem('cart', JSON.stringify(data));
     }, err => {
       console.log(err);
     });
   }*/
  removeCart(item) {
    this.productService.deleteToCart(this.userId, item).subscribe(data => {
      this.shopModel = data;
      this.total();
    }, err => {
      console.log(err);
    });
  }
  placeOrder() {
    if (JSON.parse(sessionStorage.getItem('login'))) {
      this.router.navigate(['product/placeorder']);
      sessionStorage.setItem('orderSummary', JSON.stringify(this.shopModel));
    } else {
    this.router.navigate(['account/signin']);
   }
  }
}
