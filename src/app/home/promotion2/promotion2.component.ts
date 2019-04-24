import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Ads } from './ads.model';
import {HomeService} from '../home.service';

@Component({
  selector: 'app-promotion2',
  templateUrl: './promotion2.component.html',
  styleUrls: ['./promotion2.component.css']
})
export class Promotion2Component implements OnInit {
  productsModel: Ads;
  constructor(private fb: FormBuilder, private router: Router, private homeService: HomeService) { }
    ngOnInit() {
      this.getHotProducts();
    }
    getHotProducts() {
      this.homeService.getHotProducts().subscribe(data => {
        this.productsModel = data;
        console.log('hot products', data);
      }, err => {
        console.log(err);
      });
    }

}
