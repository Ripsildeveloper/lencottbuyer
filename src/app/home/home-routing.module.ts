import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BannerComponent } from './banner/banner.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {
    path: 'banner', component: BannerComponent,
  }, {
    path: 'welcome', component: HomeComponent,
  }];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class HomeRoutingModule { }
