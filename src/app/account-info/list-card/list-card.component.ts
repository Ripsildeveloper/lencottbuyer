import { Component, OnInit } from '@angular/core';
import { CardDetailsService } from './../card-details/card-details.service';
import { AccountService } from './../account.service';
import { RegModel } from './../registration/registration.model';
import { CardDetailModel } from './../card-details/cardDetails.model';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';



@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.css']
})
export class ListCardComponent implements OnInit {
  userId: string;
  regModel: RegModel;
  addressForm: FormGroup;
  cardDetailModel: CardDetailModel[];
  addressHolder: CardDetailModel;
  
  constructor(private accountService: AccountService, private cardDetailsService: CardDetailsService ) { }

  ngOnInit() {
    this.userId = sessionStorage.getItem('userId');
    this.getCards();
  }

  addCard() {
    this.cardDetailsService.openCard().subscribe(
      res => {
        if (res)         {
          this.getCards();
        }
      }
    );
  }

  getCards() {
    this.accountService.getCustomerDetails(this.userId).subscribe(data => {
    this.regModel = data;
    this.cardDetailModel = data.cardDetails;
    }, error => {
      console.log(error);
    });
  }
  deleteCard(cardId)   {
    this.accountService.customerCardDelete(this.userId, cardId).subscribe(data => {
      this.cardDetailModel = data.cardDetails;
      }, error => {
        console.log(error);
      });
  }
}
