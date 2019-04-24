import { Component, OnInit, Input } from '@angular/core';
import { HotProduct } from './hot-product.model';

@Component({
  selector: 'app-hot-product',
  templateUrl: './hot-product.component.html',
  styleUrls: ['./hot-product.component.css']
})
export class HotProductComponent implements OnInit {
  @Input() hotProduct: HotProduct;
  constructor() { }

  ngOnInit() {
  }

}
