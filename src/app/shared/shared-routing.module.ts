import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavComponent} from './nav/nav.component';
import { Routes, RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';

const routes: Routes = [
  {
    path: 'nav',
    component: NavComponent},
  {
  path: 'footer',
  component: FooterComponent,
}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})


export class SharedRoutingModule { }
