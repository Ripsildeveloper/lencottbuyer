import { Component, OnInit } from '@angular/core';
import { Product } from './../model/product.model';
import { SuperCategory } from './../model/superCategory.model';
import { Router } from '@angular/router';
import {SharedService} from '../shared.service';

@Component({
  selector: 'app-category-menu',
  templateUrl: './category-menu.component.html',
  styleUrls: ['./category-menu.component.css']
})
export class CategoryMenuComponent implements OnInit {
  navbarShow = false;
  superCategory: SuperCategory[];
  product: Product[];
  dropdownShow = false;
  mainCategory;
  selectedDropDown: string;
  selected: any;

  constructor(private sharedService: SharedService, private router: Router) { }

  ngOnInit() {
    this.getSuperCategory();
  }
  toggleNavbar() {
    this.navbarShow = !this.navbarShow;
    /* this.dropdownShow = !this.dropdownShow; */
  }
  getSuperCategory() {
    this.sharedService.getSuperCategory().subscribe(data => {
      this.superCategory = data;
    });
  }
  toggleDropdown(cat) {
    this.superCategory.forEach(element => {
      if (element._id === cat._id) {
        this.dropdownShow = !this.dropdownShow;
        this.selectedDropDown = element._id;
      }
    });
  }
  viewCategory(subcat)   {
    this.selectedDropDown = '';
    localStorage.removeItem('productSortType');
    localStorage.removeItem('filterPrice');
    localStorage.removeItem('filterColor');
    localStorage.removeItem('filterMaterial');
    this.router.navigate(['/product/productlist', subcat]);
  }
  toggleDropdownLeave() {
    this.selectedDropDown = '';
    this.selected = '';
  }
  toggleLeave() {
    this.dropdownShow = !this.dropdownShow;
  }
}
