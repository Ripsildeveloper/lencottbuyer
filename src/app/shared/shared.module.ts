import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { Routes, RouterModule } from '@angular/router';
import {SharedRoutingModule} from './shared-routing.module';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedRoutingModule,
  ]
})
export class SharedModule { }
