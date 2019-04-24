export class SuperCategory {
    categoryName: string;
    categoryDescription: string;
    categoryImageName: string;
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
