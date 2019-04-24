import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from './../account.service';
import {  RegModel } from './../registration/registration.model';
/* import { mobileNumber } from './../../shared/validation'; */
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  regModel: RegModel;
  registerModel: RegModel[];
  profileForm: FormGroup;
  userId: string;
  loginUser = false;
  constructor(private fb: FormBuilder, private router: Router, private accountService: AccountService) { }

  ngOnInit() {
    this.profileDetails();
    this.userId = sessionStorage.getItem('userId');
    if (JSON.parse(sessionStorage.getItem('login'))) {
      this.getRegister();
    } else {
      this.loginUser = true;
    }
  }
  profileDetails() {
    this.profileForm = this.fb.group({
      emailId: ['', Validators.email],
      password: ['', [Validators.required, Validators.minLength(6)]],
      mobileNumber: [''],
      firstName: [''],
      lastName: [''],
      dateOfBirth: [''],
      location: [''],
      gender: ['']
    });
  }
  getRegister() {
    this.accountService.getCustomerDetails(this.userId).subscribe(data => {
    this.regModel = data;
    this.profileForm = this.fb.group({
      emailId: [this.regModel.emailId, Validators.email],
      password: [this.regModel.password],
      mobileNumber: [this.regModel.mobileNumber],
      firstName: [this.regModel.firstName],
      lastName: [this.regModel.lastName],
      dateOfBirth: [this.regModel.dateOfBirth],
      location: [this.regModel.location],
      gender: [this.regModel.gender]
    });
    }, error => {
      console.log(error);
    });
  }
  onSubmit() {
    this.regModel = new RegModel();
    this.regModel.emailId = this.profileForm.controls.emailId.value;
    this.regModel.mobileNumber = this.profileForm.controls.mobileNumber.value;
    this.regModel.firstName = this.profileForm.controls.firstName.value;
    this.regModel.lastName = this.profileForm.controls.lastName.value;
    this.regModel.dateOfBirth = this.profileForm.controls.dateOfBirth.value;
    this.regModel.location = this.profileForm.controls.location.value;
    this.regModel.gender = this.profileForm.controls.gender.value;
    this.accountService.getprofileDetails(this.regModel, this.userId).subscribe(data => {
      this.registerModel = data;
      this.router.navigate(['account/listaddress']);
    }, error => {
        console.log(error);
    }
    );
    /* console.log(this.regForm); */
  }
  getReset() {
    this.profileForm.reset();
  }
}
