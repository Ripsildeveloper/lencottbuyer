import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration/registration.component';
import { AccountInfoRoutingModule } from './account-info-routing.module';
import { AccountService } from './account.service';
import { AddressService } from './address/address.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  MatSidenavModule,
  MatListModule,
  MatTooltipModule,
  MatOptionModule,
  MatSelectModule,
  MatMenuModule,
  MatSnackBarModule,
  MatGridListModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatRadioModule,
  MatCheckboxModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatExpansionModule,
  MatRippleModule,
  MatDialogModule,
  MatChipsModule,
  MatInputModule,
  MatFormFieldModule,
  MatStepperModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatTableModule,
  MatSortModule,
  MatTabsModule,
  MatSliderModule
} from '@angular/material';
import { CardDetailsComponent } from './card-details/card-details.component';
import { AddressComponent } from './address/address.component';
import { ProfileComponent } from './profile/profile.component';
import { SigninComponent } from './signin/signin.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { ListAddressComponent } from './list-address/list-address.component';
import { ListCardComponent } from './list-card/list-card.component';
import { CardDetailsService } from './card-details/card-details.service';
import { OrderComponent } from './order-mananagement/order/order.component';

@NgModule({
  declarations: [RegistrationComponent,
    CardDetailsComponent, AddressComponent, ProfileComponent,
     SigninComponent, AccountDetailsComponent, ListAddressComponent, ListCardComponent, OrderComponent],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    AccountInfoRoutingModule,
    MatSidenavModule,
    MatListModule,
    MatTooltipModule,
    MatOptionModule,
    MatSelectModule,
    MatMenuModule,
    MatSnackBarModule,
    MatGridListModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatRadioModule,
    MatCheckboxModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatRippleModule,
    MatDialogModule,
    MatChipsModule,
    MatInputModule,
    MatFormFieldModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatTabsModule,
    MatSliderModule
  ],
  providers: [AccountService, AddressService, CardDetailsService],
  entryComponents: [AccountDetailsComponent,  CardDetailsComponent]
})
export class AccountInfoModule { }
