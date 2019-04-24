import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { CardDetailsComponent } from './card-details/card-details.component';
import { AddressComponent } from './address/address.component';
import { ProfileComponent } from './profile/profile.component';
import { SigninComponent } from './signin/signin.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { ListAddressComponent } from './list-address/list-address.component';
import { ListCardComponent } from './list-card/list-card.component';
import { OrderComponent } from './order-mananagement/order/order.component';
const routes: Routes = [
 {path: '',
  component: AccountDetailsComponent,
children: [
{ path: 'card', component: CardDetailsComponent },
{ path: 'address', component: AddressComponent },
{ path: 'profile', component: ProfileComponent },
{ path: 'listcard', component: ListCardComponent },
{ path: 'order', component: OrderComponent },
{ path: 'listaddress', component: ListAddressComponent }]
},
{ path: 'registration', component: RegistrationComponent },
{ path: 'signin', component: SigninComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountInfoRoutingModule { }
