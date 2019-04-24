import { Injectable, Inject, Optional } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  constructor(private meta: Meta) {
  }
  metaTagDescription() {
    this.meta.addTags([
      { name: 'description', content: 'seller Platform' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'robots', content: 'INDEX, FOLLOW' },
      { name: 'author', content: 'ABCD' },
      { name: 'keywords', content: 'welcome, Test' },
      { name: 'date', content: '2018-06-02', scheme: 'YYYY-MM-DD' },
      { httpEquiv: 'Content-Type', content: 'text/html' },
      { property: 'og:title', content: 'My Text' },
      { property: 'og:type', content: 'website' },
      { charset: 'UTF-8' }
    ]);
  }
}
