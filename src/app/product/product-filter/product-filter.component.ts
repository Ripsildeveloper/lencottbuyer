import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  constructor() { }
  filterPrice;
  filterColor;
  filterMaterial;
priceRangeValue = ['250-500', '500-1000', '1000-1500', '1500-2000'];
color = ['Black', 'Blue', 'Yellow', 'Red'];
material = ['Polyster', 'Leather', 'Rexin'];
  ngOnInit() {
   this.filterPrice = localStorage.getItem('filterPrice');
   this.filterColor = localStorage.getItem('filterColor');
   this.filterMaterial = localStorage.getItem('filterMaterial');
  }
  showPriceOptions(val) {
    localStorage.setItem('filterPrice', val);
  }
  showColorOptions(val) {
    localStorage.setItem('filterColor', val);
  }
  showMaterialOptions(val) {
    localStorage.setItem('filterMaterial', val);
  }
}
