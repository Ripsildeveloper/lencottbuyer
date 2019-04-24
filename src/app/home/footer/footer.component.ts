import { Component, OnInit } from '@angular/core';
import { Footer } from './footer.model';
import {HomeService} from '../home.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  footerDetails: Footer;
  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.allFooter();
  }
    allFooter() {
      this.homeService.getFooterDetails().subscribe(data => {
        this.footerDetails = data;
        console.log(data);
      }, error => {
        console.log(error);
      });
    }

}
