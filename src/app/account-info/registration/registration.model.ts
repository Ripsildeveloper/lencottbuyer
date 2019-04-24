import { CardDetailModel } from './../card-details/cardDetails.model';
import { AddressModel } from './../address/address.model';
import { ProfileModel } from './../profile/profile.model';
export class RegModel {
    mobileNumber: number;
    emailId: string;
    password: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    location: string;
    gender: string;
    addressDetails: [AddressModel];
    cardDetails: [CardDetailModel];
    /* ProfileModels: [ProfileModel]; */
}
