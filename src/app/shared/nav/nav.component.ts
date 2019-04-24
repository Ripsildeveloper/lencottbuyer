import { Component, OnInit } from '@angular/core';
import { SharedService } from './../shared.service';
import { Header } from './header.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  navbarShow = false;
  header: Header[];
  dropdownShow = false;
  mainCategory;
  selectedDropDown: string;
  selected: any;
  logoImage: string;

  constructor(public sharedService: SharedService, private router: Router) { }

  ngOnInit() {
    this.allHeader();
  }

  allHeader() {
    this.sharedService.getHeaderDetails().subscribe(data => {
      this.header = data;
      this.header.map(elememt =>        {
          this.logoImage = elememt.logoImageName;
        }
      );
      console.log(data);
    }, error => {
      console.log(error);
    });
  }
  
  toggleNavbar() {
    this.navbarShow = !this.navbarShow;
  }
  toggleDropdownLeave() {
    this.selectedDropDown = '';
    this.selected = '';
  }
  toggleLeave() {
    this.dropdownShow = !this.dropdownShow;
  }
  shoppingView()    {
    this.router.navigate(['/product/shopping']);
  }

  logOut()    {
    this.sharedService.sessionLogout();
    this.router.navigate(['account/signin']);
  }
 }
