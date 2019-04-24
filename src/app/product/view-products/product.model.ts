import { Size } from './size.model';
export class Product {
    /* _id: string; */
    productId: string;
    productTitle: string;
    productName: string;
    productDescription: string;
    shortDescription: string;
    price: string;
    color: string;
    styleCode: string;
    skuCode: string;
    skuCodeVerify: boolean;
    bulletPoints: string;
    productImageName: [string];
    subCategory: string;
    size: [Size];
    moq: string;
    mfdQty: number;
    mfdQtyEditing: boolean;
    // details
    material: string;
    weight: string;
    height: string;
    occassion: string;
}
