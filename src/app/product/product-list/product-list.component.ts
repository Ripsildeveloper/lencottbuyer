import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { MatPaginatorIntl } from '@angular/material';
import { ParamMap, ActivatedRoute, NavigationEnd, Router, Params } from '@angular/router';
import { ProductService } from './../product.service';
import { Product } from '../../shared/model/product.model';
import { Observable, } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Filter } from './filter.model';
import { ProductSettings } from './../../shared/model/productFilter.model';
import { Cart } from './../../shared/model/cart.model';
import { MOQ } from '../../shared/model/moq.model';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  message;
  action;
  moqModel: MOQ;
  productModel: any;
  productSettingsModel: ProductSettings;
  productSettingsPrice: ProductSettings;
  productSettingsColor: ProductSettings;
  productSettingsMaterial: ProductSettings;
  productModel$: Observable<string>;
  cat: { catId: string };
  cart: Cart;
  cartModel: any;
  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  filterPrice;
  filterColor;
  filterMaterial;
  sortBy = [{
    type: 'lowtohigh',
    value: 'Price - Low To High'
  }, {
    type: 'hightolow',
    value: 'Price -  High To Low'
  }];
  selectedCheckBox;
  selectedMaterialCheckBox;
  selectedPriceCheckBox;
  selectedSortVal;
  public array: any;
  public displayedColumns = ['', '', '', '', ''];
  public dataSource: any;
  filterModel: Filter;
  resultdata: any;
  userId: string;
  constructor(public productService: ProductService, private route: ActivatedRoute, private router: Router, private snackBar: MatSnackBar) {

  }
  ngOnInit() {
    localStorage.removeItem('filterMaterial');
    localStorage.removeItem('minimumPriceFilter');
    localStorage.removeItem('maximumPriceFilter');
    localStorage.removeItem('filterColor');
    /*  this.productModel$ = this.route.paramMap.pipe(
       switchMap(params => {
         this.catid = params.get('catId');
         this.viewCategory();
                return this.catid;
       })
     ); */
    this.cat = {
      catId: this.route.snapshot.params.catid
    };
    this.route.params.subscribe((params: Params) => {
      this.cat.catId = params.catId;
      this.viewCategory();
    });
    this.userId = sessionStorage.getItem('userId');

    this.getFilterMenu();
    /* this.getProducts(); */

  }
  getProducts() {
    this.productService.getAllProducts().subscribe(data => {
      this.productModel = data;
    }, err => {
      console.log(err);
    });
  }
  
  getFilterMenu() {
    this.productService.getFilterData().subscribe(data => {
      this.productSettingsPrice = data[0].priceRange;
      this.productSettingsColor = data[0].color;
      this.productSettingsMaterial = data[0].material;
    }, err => {
      console.log(err);
    });
  }

  sortType(val) {
    this.selectedSortVal = val;
    localStorage.setItem('productSortType', val);
    if (val === 'lowtohigh') {
      this.lowToHigh();
    } else if (val === 'hightolow') {
      this.highToLow();
    }
  }
  highToLow() {
    this.productModel.sort((a, b) => {
      return b.price - a.price;
    });
  }
  viewCategory() {
    this.productService.getViewCategory(this.cat.catId).subscribe(data => {
      const val = localStorage.getItem('productSortType');
      this.selectedSortVal = val;
      if (val === 'lowtohigh') {
        data.sort((a, b) => {
          return a.price - b.price;
        });
        this.productModel = data;
        console.log('sorted product low to high', this.productModel);
      } else if (val === 'hightolow') {
        data.sort((a, b) => {
          return b.price - a.price;
        });
        this.productModel = data;
      } else if (val === undefined || val === null) {
        this.productModel = data;
      }
      this.productModel.paginator = this.paginator;
      this.productModel = data;
      this.array = data;
      this.totalSize = this.array.length;
      this.iterator();
    }, error => {
      console.log(error);
    });
  }
  lowToHigh() {

    this.productModel.sort((a, b) => {
      return a.price - b.price;
    });
  }
  public handlePage(e: any) {
    console.log('paginator', e);
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }
  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.array.slice(start, end);
    this.productModel = part;
  }
  viewSingleProduct(id) {
    this.router.navigate(['/product/productview', id]);
  }
  // filter by price

  showPriceOptions(e, i) {
    if (e.checked === true) {
      this.selectedPriceCheckBox = i;
      const PriceVal = e.source.value;
      const splittedVal = PriceVal.split('-');
      localStorage.setItem('minimumPriceFilter', splittedVal[0]);
      localStorage.setItem('maximumPriceFilter', splittedVal[1]);
      const MaterialSelected = localStorage.getItem('filterMaterial');
      const ColorSelected = localStorage.getItem('filterColor');
      this.filterModel = new Filter();
      this.filterModel.minimumPriceFilter = +splittedVal[0];
      this.filterModel.maximumPriceFilter = +splittedVal[1];
      this.filterModel.materialFilter = MaterialSelected;
      this.filterModel.colorFilter = ColorSelected;
      this.productService.filterByColor(this.cat.catId, this.filterModel).subscribe(data => {
        const val = localStorage.getItem('productSortType');
        if (val === 'lowtohigh') {
          data.sort((a, b) => {
            return a.price - b.price;
          });
          this.productModel = data;
        } else if (val === 'hightolow') {
          data.sort((a, b) => {
            return b.price - a.price;
          });
          this.productModel = data;
        } else if (val === undefined || val === null) {
          this.productModel = data;
        }
        this.productModel = data;
        this.productModel.paginator = this.paginator;
        this.array = data;
        this.totalSize = this.array.length;
        this.iterator();
      }, err => {
        console.log(err);
      });
    } else if (e.checked === false) {
      localStorage.removeItem('minimumPriceFilter');
      localStorage.removeItem('maximumPriceFilter');
      const MaterialSelected = localStorage.getItem('filterMaterial');
      const ColorSelected = localStorage.getItem('filterColor');
      if ((MaterialSelected === null || MaterialSelected === undefined) &&
        (ColorSelected === null || ColorSelected === undefined)) {  // filter only price
        this.viewCategory();
      } else if ((MaterialSelected !== null || MaterialSelected !== undefined) &&
        (ColorSelected === null || ColorSelected === undefined)) {  // filter only material
        this.filterModel = new Filter();
        this.filterModel.materialFilter = MaterialSelected;
        this.productService.filterByColor(this.cat.catId, this.filterModel).subscribe(data => {
          const val = localStorage.getItem('productSortType');
          if (val === 'lowtohigh') {
            data.sort((a, b) => {
              return a.price - b.price;
            });
            this.productModel = data;
          } else if (val === 'hightolow') {
            data.sort((a, b) => {
              return b.price - a.price;
            });
            this.productModel = data;
          } else if (val === undefined || val === null) {
            this.productModel = data;
          }
          this.productModel = data;
          this.productModel.paginator = this.paginator;
          this.productModel = data;
          this.array = data;
          this.totalSize = this.array.length;
          this.iterator();
        }, err => {
          console.log(err);
        });
      } else if ((ColorSelected !== null || ColorSelected !== undefined) &&
        (MaterialSelected === null || MaterialSelected === undefined)) {  // filter only color
        this.filterModel = new Filter();
        this.filterModel.colorFilter = ColorSelected;
        this.productService.filterByColor(this.cat.catId, this.filterModel).subscribe(data => {
          const val = localStorage.getItem('productSortType');
          if (val === 'lowtohigh') {
            data.sort((a, b) => {
              return a.price - b.price;
            });
            this.productModel = data;
          } else if (val === 'hightolow') {
            data.sort((a, b) => {
              return b.price - a.price;
            });
            this.productModel = data;
          } else if (val === undefined || val === null) {
            this.productModel = data;
          }
          this.productModel = data;
          this.productModel.paginator = this.paginator;
          this.productModel = data;
          this.array = data;
          this.totalSize = this.array.length;
          this.iterator();
        }, err => {
          console.log(err);
        });
      } else if ((ColorSelected !== null || ColorSelected !== undefined) &&
        (MaterialSelected !== null || MaterialSelected !== undefined)) {  // filter  color and material
        this.filterModel = new Filter();
        this.filterModel.colorFilter = ColorSelected;
        this.filterModel.materialFilter = MaterialSelected;
        this.productService.filterByColor(this.cat.catId, this.filterModel).subscribe(data => {
          const val = localStorage.getItem('productSortType');
          if (val === 'lowtohigh') {
            data.sort((a, b) => {
              return a.price - b.price;
            });
            this.productModel = data;
          } else if (val === 'hightolow') {
            data.sort((a, b) => {
              return b.price - a.price;
            });
            this.productModel = data;
          } else if (val === undefined || val === null) {
            this.productModel = data;
          }
          this.productModel = data;
          this.productModel.paginator = this.paginator;
          this.productModel = data;
          this.array = data;
          this.totalSize = this.array.length;
          this.iterator();
        }, err => {
          console.log(err);
        });
      }
    }
  }
  // filter By color
  showColorOptions(e, i) {
    if (e.checked === true) {
      this.selectedCheckBox = i;
      localStorage.setItem('filterColor', e.source.value);
      const MinimumPriceSelected = localStorage.getItem('minimumPriceFilter');
      const MaximumPriceSelected = localStorage.getItem('maximumPriceFilter');
      this.filterModel = new Filter();
      this.filterModel.colorFilter = e.source.value;
      if (MinimumPriceSelected !== null && MaximumPriceSelected !== null) {
        this.filterModel.minimumPriceFilter = +MinimumPriceSelected;
        this.filterModel.maximumPriceFilter = +MaximumPriceSelected;
      } else {
        this.filterModel.minimumPriceFilter = undefined;
        this.filterModel.maximumPriceFilter = undefined;
      }
      this.filterModel.materialFilter = localStorage.getItem('filterMaterial');
      this.productService.filterByColor(this.cat.catId, this.filterModel).subscribe(data => {
        const val = localStorage.getItem('productSortType');
        if (val === 'lowtohigh') {
          data.sort((a, b) => {
            return a.price - b.price;
          });
          this.productModel = data;
        } else if (val === 'hightolow') {
          data.sort((a, b) => {
            return b.price - a.price;
          });
          this.productModel = data;
        } else if (val === undefined || val === null) {
          this.productModel = data;
        }
        this.productModel = data;
        this.productModel.paginator = this.paginator;
        this.productModel = data;
        this.array = data;
        this.totalSize = this.array.length;
        this.iterator();
      }, err => {
        console.log(err);
      });
    } else if (e.checked === false) {
      localStorage.removeItem('filterColor');
      const MaterialSelected = localStorage.getItem('filterMaterial');
      const MinimumPriceSelected = localStorage.getItem('minimumPriceFilter');
      const MaximumPriceSelected = localStorage.getItem('maximumPriceFilter');
      if ((MinimumPriceSelected !== null && MinimumPriceSelected !== undefined) &&
        (MaximumPriceSelected !== undefined && MaximumPriceSelected !== null)) {
        this.filterModel.minimumPriceFilter = +MinimumPriceSelected;
        this.filterModel.maximumPriceFilter = +MaximumPriceSelected;
      } else if ((MinimumPriceSelected === null || MinimumPriceSelected === undefined || MinimumPriceSelected === '0') &&
        (MaximumPriceSelected === undefined && MaximumPriceSelected === undefined || MaximumPriceSelected === '0')) {
        this.filterModel.minimumPriceFilter = undefined;
        this.filterModel.maximumPriceFilter = undefined;
      }
      if ((MaterialSelected === null || MaterialSelected === undefined) &&
        (MinimumPriceSelected === null || MinimumPriceSelected === undefined) &&
        (MaximumPriceSelected === null || MaximumPriceSelected === undefined)) { // no filter
        this.viewCategory();
      } else if ((MaterialSelected !== null || MaterialSelected !== undefined) &&
        (MinimumPriceSelected !== null || MinimumPriceSelected !== undefined) &&
        (MaximumPriceSelected !== null || MaximumPriceSelected !== undefined)) {  // filter material and price
        this.filterModel = new Filter();
        this.filterModel.materialFilter = MaterialSelected;
        this.filterModel.minimumPriceFilter = +MinimumPriceSelected;
        this.filterModel.maximumPriceFilter = +MaximumPriceSelected;
        this.productService.filterByColor(this.cat.catId, this.filterModel).subscribe(data => {
          const val = localStorage.getItem('productSortType');
          if (val === 'lowtohigh') {
            data.sort((a, b) => {
              return a.price - b.price;
            });
            this.productModel = data;
          } else if (val === 'hightolow') {
            data.sort((a, b) => {
              return b.price - a.price;
            });
            this.productModel = data;
          } else if (val === undefined || val === null) {
            this.productModel = data;
          }
          this.productModel = data;
          this.productModel.paginator = this.paginator;
          this.productModel = data;
          this.array = data;
          this.totalSize = this.array.length;
          this.iterator();
        }, err => {
          console.log(err);
        });
      } else if ((MaterialSelected !== null || MaterialSelected !== undefined) &&
        (MinimumPriceSelected === null || MinimumPriceSelected === undefined || MinimumPriceSelected === '0') &&
        (MaximumPriceSelected === null || MaximumPriceSelected === undefined || MaximumPriceSelected === '0')) {  // filter only material
        this.filterModel = new Filter();
        this.filterModel.materialFilter = MaterialSelected;
        this.productService.filterByColor(this.cat.catId, this.filterModel).subscribe(data => {
          const val = localStorage.getItem('productSortType');
          if (val === 'lowtohigh') {
            data.sort((a, b) => {
              return a.price - b.price;
            });
            this.productModel = data;
          } else if (val === 'hightolow') {
            data.sort((a, b) => {
              return b.price - a.price;
            });
            this.productModel = data;
          } else if (val === undefined || val === null) {
            this.productModel = data;
          }
          this.productModel = data;
          this.productModel.paginator = this.paginator;
          this.productModel = data;
          this.array = data;
          this.totalSize = this.array.length;
          this.iterator();
        }, err => {
          console.log(err);
        });
      } else if ((MinimumPriceSelected !== null || MinimumPriceSelected !== undefined) &&
        (MaximumPriceSelected !== null || MaximumPriceSelected !== undefined) &&
        (MaterialSelected === null || MaterialSelected === undefined)) {  // filter only price
        this.filterModel = new Filter();
        this.filterModel.minimumPriceFilter = +MinimumPriceSelected;
        this.filterModel.maximumPriceFilter = +MaximumPriceSelected;
        this.productService.filterByColor(this.cat.catId, this.filterModel).subscribe(data => {
          const val = localStorage.getItem('productSortType');
          if (val === 'lowtohigh') {
            data.sort((a, b) => {
              return a.price - b.price;
            });
            this.productModel = data;
          } else if (val === 'hightolow') {
            data.sort((a, b) => {
              return b.price - a.price;
            });
            this.productModel = data;
          } else if (val === undefined || val === null) {
            this.productModel = data;
          }
          this.productModel = data;
          this.productModel.paginator = this.paginator;
          this.productModel = data;
          this.array = data;
          this.totalSize = this.array.length;
          this.iterator();
        }, err => {
          console.log(err);
        });
      }
    }
  }
  showMaterialOptions(e, i) {
    if (e.checked === true) {
      this.selectedMaterialCheckBox = i;
      localStorage.setItem('filterMaterial', e.source.value);
      this.filterModel = new Filter();
      const MinimumPriceSelected = localStorage.getItem('minimumPriceFilter');
      const MaximumPriceSelected = localStorage.getItem('maximumPriceFilter');
      this.filterModel.colorFilter = localStorage.getItem('filterColor');
      this.filterModel.materialFilter = e.source.value;
      if ((MinimumPriceSelected !== null && MinimumPriceSelected !== undefined) &&
        (MaximumPriceSelected !== undefined && MaximumPriceSelected !== null)) {
        this.filterModel.minimumPriceFilter = +MinimumPriceSelected;
        this.filterModel.maximumPriceFilter = +MaximumPriceSelected;
      } else if ((MinimumPriceSelected === null || MinimumPriceSelected === undefined) &&
        (MaximumPriceSelected === null || MaximumPriceSelected === undefined)) {
        this.filterModel.minimumPriceFilter = undefined;
        this.filterModel.maximumPriceFilter = undefined;
      }
      this.productService.filterByColor(this.cat.catId, this.filterModel).subscribe(data => {
        const val = localStorage.getItem('productSortType');
        if (val === 'lowtohigh') {
          data.sort((a, b) => {
            return a.price - b.price;
          });
          this.productModel = data;
        } else if (val === 'hightolow') {
          data.sort((a, b) => {
            return b.price - a.price;
          });
          this.productModel = data;
        } else if (val === undefined || val === null) {
          this.productModel = data;
        }
        this.productModel = data;
        this.productModel.paginator = this.paginator;
        this.productModel = data;
        this.array = data;
        this.totalSize = this.array.length;
        this.iterator();
      }, err => {
        console.log(err);
      });
    } else if (e.checked === false) {
      localStorage.removeItem('filterMaterial');
      const ColorSelected = localStorage.getItem('filterColor');
      const MinimumPriceSelected = localStorage.getItem('minimumPriceFilter');
      const MaximumPriceSelected = localStorage.getItem('maximumPriceFilter');
      if ((MinimumPriceSelected !== null && MinimumPriceSelected !== undefined) &&
        (MinimumPriceSelected !== undefined && MaximumPriceSelected !== null)) {
        this.filterModel.minimumPriceFilter = +MinimumPriceSelected;
        this.filterModel.maximumPriceFilter = +MaximumPriceSelected;
      } else if ((MinimumPriceSelected === null || MinimumPriceSelected === undefined)) {
        this.filterModel.minimumPriceFilter = undefined;
        this.filterModel.maximumPriceFilter = undefined;
      }
      if ((ColorSelected === null || ColorSelected === undefined) &&
        (MinimumPriceSelected === null || MinimumPriceSelected === undefined) &&
        (MaximumPriceSelected === null || MaximumPriceSelected === undefined)) {  // no filter
        this.viewCategory();
      } else if ((ColorSelected !== null || ColorSelected !== undefined) &&
        (MinimumPriceSelected === null || MinimumPriceSelected === undefined || MinimumPriceSelected === '0') &&
        (MaximumPriceSelected === null || MaximumPriceSelected === undefined || MaximumPriceSelected === '0')) { // filter only color
        this.filterModel = new Filter();
        this.filterModel.colorFilter = ColorSelected;
        this.productService.filterByColor(this.cat.catId, this.filterModel).subscribe(data => {
          const val = localStorage.getItem('productSortType');
          if (val === 'lowtohigh') {
            data.sort((a, b) => {
              return a.price - b.price;
            });
            this.productModel = data;
          } else if (val === 'hightolow') {
            data.sort((a, b) => {
              return b.price - a.price;
            });
            this.productModel = data;
          } else if (val === undefined || val === null) {
            this.productModel = data;
          }
          this.productModel = data;
          this.productModel.paginator = this.paginator;
          this.productModel = data;
          this.array = data;
          this.totalSize = this.array.length;
          this.iterator();
        }, err => {
          console.log(err);
        });
      } else if ((MinimumPriceSelected !== null || MinimumPriceSelected !== undefined) &&
        (MaximumPriceSelected !== null || MaximumPriceSelected !== undefined) &&
        (ColorSelected === null || ColorSelected === undefined)) { // filter only price
        this.filterModel = new Filter();
        if (MinimumPriceSelected !== null && MaximumPriceSelected !== null) {
          this.filterModel.minimumPriceFilter = +MinimumPriceSelected;
          this.filterModel.maximumPriceFilter = +MaximumPriceSelected;
        }
        this.productService.filterByColor(this.cat.catId, this.filterModel).subscribe(data => {
          const val = localStorage.getItem('productSortType');
          if (val === 'lowtohigh') {
            data.sort((a, b) => {
              return a.price - b.price;
            });
            this.productModel = data;
          } else if (val === 'hightolow') {
            data.sort((a, b) => {
              return b.price - a.price;
            });
            this.productModel = data;
          } else if (val === undefined || val === null) {
            this.productModel = data;
          }
          this.productModel = data;
          this.productModel.paginator = this.paginator;
          this.productModel = data;
          this.array = data;
          this.totalSize = this.array.length;
          this.iterator();
        }, err => {
          console.log(err);
        });
      } else if ((MinimumPriceSelected !== null || MinimumPriceSelected !== undefined) &&
        (MaximumPriceSelected !== null || MaximumPriceSelected !== undefined) &&
        (ColorSelected !== null || ColorSelected !== undefined)) { // filter price and color
        this.filterModel = new Filter();
        if (MinimumPriceSelected !== null && MaximumPriceSelected !== null) {
          this.filterModel.minimumPriceFilter = +MinimumPriceSelected;
          this.filterModel.maximumPriceFilter = +MaximumPriceSelected;
        }
        this.filterModel.colorFilter = ColorSelected;
        this.productService.filterByColor(this.cat.catId, this.filterModel).subscribe(data => {
          const val = localStorage.getItem('productSortType');
          if (val === 'lowtohigh') {
            data.sort((a, b) => {
              return a.price - b.price;
            });
            this.productModel = data;
          } else if (val === 'hightolow') {
            data.sort((a, b) => {
              return b.price - a.price;
            });
            this.productModel = data;
          } else if (val === undefined || val === null) {
            this.productModel = data;
          }
          this.productModel = data;
          this.productModel.paginator = this.paginator;
          this.productModel = data;
          this.array = data;
          this.totalSize = this.array.length;
          this.iterator();
        }, err => {
          console.log(err);
        });
      }
    }
  }

  addToCart(product) {
    if (JSON.parse(sessionStorage.getItem('login'))) {
      this.addToCartServer(this.userId, product);
    } else {
      this.addToCartLocal(product);
    }
  }
  addToCartServer(userId, product) {
    this.message = 'Product Added To Cart';
    console.log(product.price);
    const item = {
      productId: product._id,
      productName: product.productName,
      productDescription: product.productDescription,
      productImageName: product.productImageName[0],
      price: product.price,
      /*   subTotal: product.price * 1, */
      set: 1,
      moq: product.moq
    };
    const totalItem: any = [];
    totalItem.push(item);
    this.cart = new Cart();
    this.cart.userId = userId;
    this.cart.skuDetail = totalItem;
    this.productService.addToCart(this.cart).subscribe(data => {
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
    this.message = 'Product Added To Cart';
    const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    if (cart.length === 0) {
      const item = {
        productId: product._id,
        productName: product.productName,
        productDescription: product.productDescription,
        productImageName: product.productImageName[0],
        price: product.price,
        /*      subTotal: product.price * 1, */
        set: 1,
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
      if (item) { // check if is not new item
        item.qty++;
        item.subTotal = item.price * item.qty;
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
          price: product.price,
          set: 1,
          moq: product.moq
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
