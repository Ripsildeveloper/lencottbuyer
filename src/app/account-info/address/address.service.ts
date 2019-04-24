
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { AddressComponent } from './address.component';
import { AddressModel } from './address.model';


@Injectable({
  providedIn: 'root'
})
export class AddressService {
  dialogRef: MatDialogRef<AddressComponent>;
  constructor(private dialog: MatDialog) { }

  openAddress(address?: AddressModel): Observable<boolean> {
    this.dialogRef = this.dialog.open(AddressComponent,
      {
        disableClose: true, backdropClass: 'light-backdrop',
        width: '720px',
        data: address,
      });
    return this.dialogRef.afterClosed();
  }
  closeAddress() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
