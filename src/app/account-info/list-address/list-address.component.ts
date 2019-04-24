import { Component, OnInit } from '@angular/core';
import { AddressService } from './../address/address.service';
import { AccountService } from './../account.service';
import { RegModel } from './../registration/registration.model';
import { AddressModel } from './../address/address.model';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-address',
  templateUrl: './list-address.component.html',
  styleUrls: ['./list-address.component.css']
})
export class ListAddressComponent implements OnInit {
userId: string;
regModel: RegModel;
addressForm: FormGroup;
addressModel: AddressModel[];
addressHolder: AddressModel;
  constructor(private fb: FormBuilder, private addressService: AddressService, private accountService: AccountService) { }

  ngOnInit() {
    this.userId = sessionStorage.getItem('userId');
    this.getAddress();
    this.addressDetails();
  }
  addAddress() {
    this.addressService.openAddress().subscribe(
      res => {
        if (res)         {
          this.getAddress();
        }
      }
    );
  }

  addressDetails() {
    this.addressForm = this.fb.group({
      streetAddress: [''],
      building: [''],
      landmark: [''],
      city: [''],
      state: [''],
      pincode: [''],
      name: [''],
      mobileNumber: ['']

    });
  }
  updateAddress(address, name, mobileNumber, building, streetAddress, landmark, city, state, pincode ) {
    this.addressHolder = new AddressModel();
    this.addressHolder.streetAddress = streetAddress.value;
    this.addressHolder.building = building.value;
    this.addressHolder.landmark = landmark.value;
    this.addressHolder.city = city.value;
    this.addressHolder.state = state.value;
    this.addressHolder.pincode = pincode.value;
    this.addressHolder.name = name.value;
    this.addressHolder.mobileNumber = mobileNumber.value;
    this.accountService.customerAddressUpdate(this.userId, address._id, this.addressHolder).subscribe(data => {
      this.regModel = data;
      address.editAddress = false;
      this.addressModel = data.addressDetails;
    }, error => {
      console.log(error);
    });
  }

  cancelAddress(address)   {
    address.editAddress = false;
  }
  getAddress() {
    this.accountService.getCustomerDetails(this.userId).subscribe(data => {
    this.regModel = data;
    this.addressModel = data.addressDetails;
    }, error => {
      console.log(error);
    });
  }
  deleteAddress(addressId)   {
    this.accountService.customerAddressDelete(this.userId, addressId).subscribe(data => {
      this.regModel = data;
      this.addressModel = data.addressDetails;
      }, error => {
        console.log(error);
      });
  }
  editAddress(addressId)   {
    this.addressModel.forEach(element => {
      element.editAddress = false;
      if (element._id === addressId) {
          element.editAddress = true;
      }
    });
  }
}
