import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ViewProductsComponent } from './view-products/view-products.component';
import {ViewSingleProductComponent} from './view-single-product/view-single-product.component';
import { ProductListComponent} from './product-list/product-list.component';
import { ProductDetailViewComponent} from './product-detail-view/product-detail-view.component';
import { ProductDetailComponent} from './product-detail/product-detail.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

const routes: Routes = [
  {
    path: 'view',
    component: ViewProductsComponent
  },
  {
    path: 'productview/:id',
    component: ProductDetailComponent
  }  ,
  {
    path: 'productlist/:catId',
    component: ProductListComponent
  },
  {
    path: 'shopping',
    component: ShoppingCartComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class ProductRoutingModule { }
