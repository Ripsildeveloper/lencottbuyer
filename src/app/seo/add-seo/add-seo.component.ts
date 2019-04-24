import { Component, OnInit } from '@angular/core';
import { SeoService } from './../seo.service';

@Component({
  selector: 'app-add-seo',
  templateUrl: './add-seo.component.html',
  styleUrls: ['./add-seo.component.css']
})
export class AddSeoComponent implements OnInit {

  constructor(private seoService: SeoService) {
    this.seoService.metaTagDescription();
  }

  ngOnInit() {
  }

}
