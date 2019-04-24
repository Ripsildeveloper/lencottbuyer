import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { MatPaginatorIntl } from '@angular/material';
import { ParamMap, ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ProductService } from './../product.service';
import { Product } from '../../shared/model/product.model';
import { Cart } from '../../shared/model/cart.model';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  productModel: any;
  id;
  showRelatedProducts;
  action;
  productId;
  relatedProducts = [];
  primeHide: boolean;
  showImages: boolean;
  selectedSmallImg: any;
  selectedImg;
  cartModel: Cart;
  shopModel: any = [];
  message;
  count = 0;
  noPrductAdd = false;
  constructor(public productService: ProductService, private route: ActivatedRoute, private router: Router, private snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.viewSingleProduct();
  }
  viewSingleProduct() {
    this.productService.getSingleProducts(this.id).subscribe(data => {
      this.productModel = data;
      this.productModel.size.forEach(element => {
        element.setCount = 0;
      });
      /* if (data.styleCode === '' || data.styleCode === undefined || data.styleCode === null) {
          this.showRelatedProducts = false;
          this.productModel = data;
        } else {
          this.showRelatedProducts = true;
          this.productService.getRelatedProducts(data).subscribe(relatedProductData => {
            console.log('related products', relatedProductData);
            relatedProductData.forEach(element => {
              if (element._id !== this.id) {
                this.relatedProducts.push(element);
              }
            });
            this.productModel = relatedProductData.find(e => e._id === this.id);
          }, err => {
            console.log(err);
          });
        } */
    }, err => {
      console.log(err);
    });
  }
  clickImg(data) {
    this.primeHide = true;
    this.showImages = true;
    this.selectedSmallImg = data;
    this.selectedImg = data;
  }
  relatedProduct(element) {
    this.relatedProducts.push(this.productModel);
    this.productModel = element;
    this.primeHide = false;
    this.showImages = false;
    const index = this.relatedProducts.indexOf(element);
    if (index !== -1) {
      this.relatedProducts.splice(index, 1);
    }
  }

  skuProduct(productId, moq) {
    this.noPrductAdd = false;
    const userId = sessionStorage.getItem('userId');
    const item: any = this.productModel.size.filter(element => (element.setCount !== 0));
    if (item.length !== 0) {
      if (JSON.parse(sessionStorage.getItem('login'))) {
      this.addToCartServer(userId, item, productId, moq);
      } else {
     /*    this.addToCartLocal(item, productId, moq); */
      }
    } else {
      setTimeout(() => {
        this.noPrductAdd = true;
      }, 100);
    }
  }
  addToCartLocal(item, product, productMoq) {
    this.message = 'Product Added To Cart';
    const cartLocal = JSON.parse(sessionStorage.getItem('cart')) || [];
    if (cartLocal.length === 0) {
      const skuDetail: any = [];
      // tslint:disable-next-line:variable-name
      item.forEach(element => {
        const cart = {
          productId: product,
          skuCode: element.skuCode,
          moq: productMoq,
          set: element.setCount,
        };
        const finalCart = {
          skuDetail: cart,
          cart_product: this.productModel
        };
        skuDetail.push(finalCart);
      });
      console.log(skuDetail);
      sessionStorage.setItem('cart', JSON.stringify(skuDetail));
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
    } else {
      /* const totalItem = cartLocal.find(ite => {
        return ite.skuCode === product._id;
      }); */
      const cartDetail: any = [];
      item.forEach(element => {
        const cart = {
          productId: product,
          skuCode: element.skuCode,
          moq: productMoq,
          set: element.setCount,
        };
        const finalCart = {
          skuDetail: cart,
          cart_product: this.productModel,
        };
        cartDetail.push(finalCart);
        /* cart_product.push(this.productModel); */
      });
      cartDetail.map(element => {
            if (cartLocal.find(s => s.skuCode === element.skuDetail.skuCode)) {
              const dbSame = cartLocal.find(s => s.skuCode === element.skuDetail.skuCode);
              dbSame.set += element.set;
              dbSame.moq = element.moq;
              console.log(element.skuDetail);
            } else {
              cartLocal.push(element);
            }
    });
      sessionStorage.setItem('cart', JSON.stringify(cartLocal));
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
    });
  }
}
  addToCartServer(userId, item, product, productMoq) {

    this.message = 'Product Added To Cart';
    const totalItem: any = [];
    item.forEach(element => {
      const cart = {
        productId: product,
        skuCode: element.skuCode,
        moq: productMoq,
        set: element.setCount,
      };
      totalItem.push(cart);
    });
    this.cartModel = new Cart();
    this.cartModel.userId = userId;
    this.cartModel.skuDetail = totalItem;
    this.productService.addToCart(this.cartModel).subscribe(data => {
      this.shopModel = data;
      this.total();
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      /* this.router.navigate(['product/shopping']); */
    }, error => {
      console.log(error);
    });
  }
  actionPlus(skuCode) {
    this.productModel.size.forEach(element => {
      if (element.skuCode === skuCode) {
        element.setCount++;
      }
    });
  }
  actionMin(skuCode, setCount) {
    if (setCount !== 0) {
      this.productModel.size.forEach(element => {
        if (element.skuCode === skuCode) {
          element.setCount--;
        }
      });
    } else {

    }
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
}
