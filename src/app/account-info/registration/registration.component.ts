import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from './../account.service';
import { RegModel } from './registration.model';
/* import { mobileNumber } from './../../shared/validation'; */
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  hide = true;
  holder: RegModel;
  regForm: FormGroup;
  emailId = new FormControl('', [Validators.required, Validators.email]);



  constructor(private fb: FormBuilder, private accountService: AccountService, private router: Router) { }

  ngOnInit() {
    this.regForm = this.fb.group({
      emailId: ['', Validators.email],
      password: ['', [Validators.required, Validators.minLength(6)]],
      mobileNumber: ['']

    });
  }

 
  onSubmit() {
    this.holder = new RegModel();
    this.holder.emailId = this.regForm.controls.emailId.value;
    this.holder.mobileNumber = this.regForm.controls.mobileNumber.value;
    this.holder.password = this.regForm.controls.password.value;
    this.accountService.getregForm(this.holder).subscribe(data => {
      this.holder = data;
      this.router.navigate(['account/signin']);
    }, error => {
      console.log(error);
    });
    /* console.log(this.regForm); */


  }
  getReset() {
    this.regForm.reset();
  }
}
