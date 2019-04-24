import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../shared/model/product.model';
import {ProductService} from '../product.service';
import {MOQ} from '../../shared/model/moq.model';
import {Cart} from '../../shared/model/cart.model';

@Component({
  selector: 'app-product-detail-view',
  templateUrl: './product-detail-view.component.html',
  styleUrls: ['./product-detail-view.component.css']
})
export class ProductDetailViewComponent implements OnInit {
  moqModel: MOQ;
  moqValue: MOQ[];
  productData: Product;
  details: boolean;
  @Input() productModel: Product;
  initialQty = 1;
  setQty;
  cartForm: FormGroup;
  userId: string;
  cart: Cart;
  cartModel: any;
  moqQty;
  changingQty;
  calculatedPrice;
  message;
  action;
  constructor(private fb: FormBuilder, private router: Router, public productService: ProductService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.createForm();
    this.userId = sessionStorage.getItem('userId');
  }
  createForm() {
    this.cartForm = this.fb.group({
qty: ['']
    });
  }
  showDetails() {
this.details = true;
  }
  buySingleProducts(id) {
    this.router.navigate(['order/placeorder', id]);
  }
  reduceQty(initalVal) {
    this.setQty = +initalVal - 1 ;
  }
  increaseQty(initalVal) {
    this.setQty = +initalVal + 1 ;
  }
  addToCart(product) {
    if (JSON.parse(sessionStorage.getItem('login'))) {
        this.addToCartServer(this.userId, product);
    } else {
      this.addToCartLocal(product);
    }
  }
  addToCartServer(userId, product) {
    this.message = 'Product added to Cart';
 /*    this.moqQty = this.moqValue.filter(
      data => data._id === product.moq);
    this.moqQtyValue = this.moqQty[0].moqQuantity;
    console.log('order qty', this.moqQty[0].moqQuantity); */
    console.log(product.price);
    const item = {
      productId: product._id,
      productName: product.productName,
      productDescription: product.productDescription,
      productImageName: product.productImageName[0],
      /* price: product.price,
      subTotal: product.price * 1, */
     /*  qty: 1, */
      set: this.setQty,
      moq: product.moq,
      price: product.price,
    /*   moqQty: this.moqQtyValue */
    };
    const totalItem: any = [];
    totalItem.push(item);
    this.cart = new Cart();
    this.cart.userId = userId;
    this.cart.skuDetail = totalItem;
    this.productService.addToCart(this.cartModel).subscribe(data => {
      this.cartModel = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      /* this.router.navigate(['product/shopping']); */
    }, error => {
      console.log(error);
    });
  }

  addToCartLocal(product) {
    this.message = 'Product added to Cart';
    const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    if (cart.length === 0) {
      const item = {
        productId: product._id,
        productName: product.productName,
        productDescription: product.productDescription,
        productImageName: product.productImageName[0],
        price: product.price,
       /*  price: product.price,
        subTotal: product.price * 1, */
   /*      qty: 1, */
        set: this.setQty,
        moq: product.moq
      };
      cart.push(item);
      sessionStorage.setItem('cart', JSON.stringify(cart));
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
    } else {
      const item = cart.find(ite => {
        return ite.productId === product._id;
      });
      if (item) {
        item.set++;
        sessionStorage.setItem('cart', JSON.stringify(cart));
        this.snackBar.open(this.message, this.action, {
          duration: 3000,
        });
      } else {
        const items = {
          productId: product._id,
          productName: product.productName,
          productDescription: product.productDescription,
          productImageName: product.productImageName[0],
          set: this.setQty,
          moq: product.moq,
          price: product.price
        };
        cart.push(items);
        sessionStorage.setItem('cart', JSON.stringify(cart));
        this.snackBar.open(this.message, this.action, {
          duration: 3000,
        });
      }
    }
  }

}
