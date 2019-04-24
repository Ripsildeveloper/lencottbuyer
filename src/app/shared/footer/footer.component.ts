import { Component, OnInit } from '@angular/core';
import {SharedService} from '../shared.service';
import {Footer} from './footer.model';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  footerDetails: Footer;
  constructor(private sharedService: SharedService) { }

  ngOnInit() {
    this.allFooter();
}

allFooter() {
  this.sharedService.getFooterDetails().subscribe(data => {
    this.footerDetails = data;
    console.log(data);
  }, error => {
    console.log(error);
  });
}
}


