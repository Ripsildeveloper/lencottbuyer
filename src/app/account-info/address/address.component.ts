import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from './../account.service';
import { AddressModel } from './address.model';
import { MatDialog, MatDialogRef } from '@angular/material';




@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  addressHolder: AddressModel;
  addressForm: FormGroup;
  userId;
  states = ['TN', 'UP', 'AP', 'KL', 'KA', 'MH', 'CH', 'JK', 'UK', 'FM', 'PONDI', 'GJ', 'JK'];
  display = 'none';
  constructor(private fb: FormBuilder, private accountService: AccountService,
              public dialogRef: MatDialogRef<AddressComponent>) { }

  ngOnInit() {
    this.addressDetails();
    this.userId = sessionStorage.getItem('userId');
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


  onSubmit() {
    this.addressHolder = new AddressModel();
    this.addressHolder.streetAddress = this.addressForm.controls.streetAddress.value;
    this.addressHolder.building = this.addressForm.controls.building.value;
    this.addressHolder.landmark = this.addressForm.controls.landmark.value;
    this.addressHolder.city = this.addressForm.controls.city.value;
    this.addressHolder.state = this.addressForm.controls.state.value;
    this.addressHolder.pincode = this.addressForm.controls.pincode.value;
    this.addressHolder.name = this.addressForm.controls.name.value;
    this.addressHolder.mobileNumber = this.addressForm.controls.mobileNumber.value;
    this.accountService.getaddressDetails(this.addressHolder, this.userId).subscribe(data => {
      this.addressHolder = data;
      this.dialogRef.close(true);
    }, error => {
      this.dialogRef.close(false);
      console.log(error);
    }
    );
    /* console.log(this.regForm); */


  }
  getReset() {
    this.addressForm.reset();
  }



}
