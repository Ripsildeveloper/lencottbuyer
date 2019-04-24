import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './banner/banner.component';
import { CategoryContentComponent } from './category-content/category-content.component';
import { FooterComponent } from './footer/footer.component';
import { ProductComponent } from './product/product.component';
import { PromotionComponent } from './promotion/promotion.component';
import { Promotion2Component } from './promotion2/promotion2.component';
import { ReviewComponent } from './review/review.component';
import { StripComponent } from './strip/strip.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import {HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { HotProductComponent } from './hot-product/hot-product.component';

@NgModule({
declarations: [BannerComponent, CategoryContentComponent, FooterComponent,
   ProductComponent, PromotionComponent, Promotion2Component, ReviewComponent,
    StripComponent, SubscribeComponent, HomeComponent, HotProductComponent],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
