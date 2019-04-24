import { Component, OnInit } from '@angular/core';
import { Banner } from './../banner/banner.model';
import { HomeService } from './../home.service';
import { Promotion } from './../promotion/promotion.model';
import { HotProduct } from './../hot-product/hot-product.model';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  banner: Banner[];
  promotion: Promotion;
  hotProduct: HotProduct;
  slideIndex = 0;
  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.allBanner();
    this.allPromotion();
    this.allHotProduct();
  }
  allBanner() {
    this.homeService.getAllBanner().subscribe(data => {
      this.banner = data;
    }, error => {
      console.log(error);
    });
  }
  minusSlides(n) {
    const min = --n;
    if (min < 0) {
      this.slideIndex = this.banner.length - 1;
    } else {
      this.slideIndex = min;
    }
  }
  plusSlides(n) {
    if (this.banner.length - 1 < n || this.banner.length - 1 <= n) {
      this.slideIndex = 0;
    } else {
      this.slideIndex = ++n;
    }
  }
  allPromotion() {
    this.homeService.getAllPromotion().subscribe(data => {
      this.promotion = data;
    }, error => {
      console.log(error);
    });
  }
  allHotProduct() {
    this.homeService.getHotProducts().subscribe(data => {
      this.hotProduct = data;
    }, error => {
      console.log(error);
    });
  }
}
