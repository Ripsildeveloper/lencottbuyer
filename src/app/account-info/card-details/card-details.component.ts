import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from './../account.service';
import { CardDetailModel } from './cardDetails.model';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.css']
})
export class CardDetailsComponent implements OnInit {
  cardHolder: CardDetailModel;
  cardModel: CardDetailModel[];
  cardDetailsForm: FormGroup;
  userId: string;
  constructor(private fb: FormBuilder, private accountService: AccountService,  public dialogRef: MatDialogRef<CardDetailsComponent>) { }
  expiryMonth = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  expiryYear = ['2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023',
  '2024', '2025', '2026', '2027', '2028', '2029', '2030', '2031', '2032', '2033', '2034', '2035', '2036', '2037', '2038', '2038',
   '2039', '2040'];
  ngOnInit() {
    this.cardDetails();
  }

  cardDetails() {
    this.cardDetailsForm = this.fb.group({
      cardName: [''],
      cardNumber: [''],
      expiryMonth: [''],
      expiryYear: ['']
    });

  }
  onSubmit() {
    this.userId = sessionStorage.getItem('userId');
    this.cardHolder = new CardDetailModel();
    this.cardHolder.cardName = this.cardDetailsForm.controls.cardName.value;
    this.cardHolder.cardNumber = this.cardDetailsForm.controls.cardNumber.value;
    this.cardHolder.expiryMonth = this.cardDetailsForm.controls.expiryMonth.value;
    this.cardHolder.expiryYear = this.cardDetailsForm.controls.expiryYear.value;
    this.accountService.getcardDetails(this.cardHolder, this.userId).subscribe(data => {
    this.cardHolder = data;
    this.dialogRef.close(true);
    this.cardHolder = data;
    },  error => {
      this.dialogRef.close(false);
      console.log(error);
    });
  }
  getReset() {
    this.cardDetailsForm.reset();
  }

}



