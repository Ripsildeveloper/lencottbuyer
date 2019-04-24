

import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { CardDetailModel } from './../card-details/cardDetails.model';
import { CardDetailsComponent } from './../card-details/card-details.component';


@Injectable({
  providedIn: 'root'
})
export class CardDetailsService {
  dialogRef: MatDialogRef<CardDetailsComponent>;
  constructor(private dialog: MatDialog) { }

  openCard(address?: CardDetailModel): Observable<boolean> {
    this.dialogRef = this.dialog.open(CardDetailsComponent,
      {
        disableClose: true, backdropClass: 'light-backdrop',
        width: '460px',
        data: address,
      });
    return this.dialogRef.afterClosed();
  }
  closeCard() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
