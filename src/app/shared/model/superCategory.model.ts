export class SuperCategory {
    _id: string;
    categoryName: string;
    categoryDescription: string;
    editing: boolean;
    checkCategoryName: boolean;
    constructor(
        categoryName: string,
        categoryDescription: string
    ) {
        this.categoryName = categoryName;
        this.categoryDescription = categoryDescription;
    }
}
