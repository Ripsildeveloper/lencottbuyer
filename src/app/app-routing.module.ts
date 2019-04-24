import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddSeoComponent } from './seo/add-seo/add-seo.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: './home/home.module#HomeModule'
  },
  {
    path: 'shared',
    loadChildren: './shared/shared.module#SharedModule'
  },
  {
    path: 'product',
    loadChildren: './product/product.module#ProductModule'
  },
  {
    path: 'account',
    loadChildren: './account-info/account-info.module#AccountInfoModule'
  },
  {
    path: '',
    redirectTo: '/home/welcome',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
