import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Banner } from './banner.model';
import {HomeService} from '../home.service';


@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  bannerModel: Banner[];
  constructor(private fb: FormBuilder, private router: Router, private homeService: HomeService) { }
  ngOnInit() {
    this.getBannersDetails();
  }
  getBannersDetails() {
    this.homeService.getAllBanner().subscribe(data => {
      this.bannerModel = data;
      console.log(data);
    }, err => {
      console.log(err);
    });
  }
}
