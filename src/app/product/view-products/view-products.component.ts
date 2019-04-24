import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from './product.model';
import { ProductSettings } from './productSettings.model';
import { ProductService } from '../product.service';
import { Filter } from './filter.model';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';


@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  productModel: any;
  productSettingsModel: ProductSettings;
  selectedSortVal;
  sortBy = [{
    type: 'lowtohigh',
    value: 'Price - Low To High'
  }, {
    type: 'hightolow',
    value: 'Price -  High To Low'
  }];
  selectedCheckBox;
  selectedMaterialCheckBox;
  selectedPriceCheckBox;
  selectedOccasionCheckBox;
  public array: any;
  public displayedColumns = ['', '', '', '', ''];
  public dataSource: any;
  filterModel: Filter;
  resultdata: any;
  catid: string;
  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  filterPrice;
  filterColor;
  filterMaterial;
  constructor(private fb: FormBuilder, private router: Router, private productService: ProductService) { }

  ngOnInit() {
    localStorage.removeItem('filterMaterial');
    localStorage.removeItem('minimumPriceFilter');
    localStorage.removeItem('maximumPriceFilter');
    localStorage.removeItem('filterColor');
    localStorage.removeItem('filterOccasion');
    this.viewAllProducts();
    this.getFilterMenu();
  }
  viewAllProducts() {
    this.productService.getAllProducts().subscribe(data => {
      this.productModel = data;
      this.productModel.paginator = this.paginator;
      this.productModel = data;
      this.array = data;
      this.totalSize = this.array.length;
      this.iterator();
      this.getFilterMenu();
    }, err => {
      console.log(err);
    });
  }

  getFilterMenu() {
    this.productService.getFilterData().subscribe(data => {
      /* console.log('filter menu', data); */
      this.productSettingsModel = data;
    }, err => {
      console.log(err);
    });
  }
  sortType(val) {
    this.selectedSortVal = val;
    localStorage.setItem('productSortType', val);
    if (val === 'lowtohigh') {
      this.lowToHigh();
    } else if (val === 'hightolow') {
      this.highToLow();
    }
  }
  highToLow() {
    this.productModel.sort((a, b) => {
      return b.sp - a.sp;
    });
  }
  lowToHigh() {

    this.productModel.sort((a, b) => {
      return a.sp - b.sp;
    });
  }
  public handlePage(e: any) {
    console.log('paginator', e);
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }
  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.array.slice(start, end);
    this.productModel = part;
  }
  viewSingleProduct(id) {
    this.router.navigate(['/product/productdetail', id]);
  }
  // filter only Price
  showPriceOptions(e, i) {
    if (e.checked === true) {
      this.selectedPriceCheckBox = i;
      const PriceVal = e.source.value;
      const splittedVal = PriceVal.split('-');
      localStorage.setItem('minimumPriceFilter', splittedVal[0]);
      localStorage.setItem('maximumPriceFilter', splittedVal[1]);
      const MaterialSelected = localStorage.getItem('filterMaterial');
      const ColorSelected = localStorage.getItem('filterColor');
      const OccasionSelected = localStorage.getItem('filterOccasion');
      this.filterModel = new Filter();
      this.filterModel.minimumPriceFilter = +splittedVal[0];
      this.filterModel.maximumPriceFilter = +splittedVal[1];
      this.filterModel.materialFilter = MaterialSelected;
      this.filterModel.colorFilter = ColorSelected;
      this.filterModel.occasionFilter = OccasionSelected;
      this.productService.filterByColor(this.catid, this.filterModel).subscribe(data => {
        const val = localStorage.getItem('productSortType');
        if (val === 'lowtohigh') {
          data.sort((a, b) => {
            return a.sp - b.sp;
          });
          this.productModel = data;
        } else if (val === 'hightolow') {
          data.sort((a, b) => {
            return b.sp - a.sp;
          });
          this.productModel = data;
        } else if (val === undefined || val === null) {
          this.productModel = data;
        }
        this.productModel = data;
        this.productModel.paginator = this.paginator;
        this.array = data;
        this.totalSize = this.array.length;
        this.iterator();
      }, err => {
        console.log(err);
      });
    } else if (e.checked === false) {
      localStorage.removeItem('minimumPriceFilter');
      localStorage.removeItem('maximumPriceFilter');
      const MaterialSelected = localStorage.getItem('filterMaterial');
      const ColorSelected = localStorage.getItem('filterColor');
      const OccasionSelected = localStorage.getItem('filterOccasion');
      if ((MaterialSelected === null || MaterialSelected === undefined) &&
        (OccasionSelected === null || OccasionSelected === undefined) &&
        (ColorSelected === null || ColorSelected === undefined) &&
        (OccasionSelected === null || OccasionSelected === undefined)) {
        this.viewAllProducts();  // no filter
      } else if ((MaterialSelected !== null || MaterialSelected !== undefined) &&
        (ColorSelected === null || ColorSelected === undefined) &&
        (OccasionSelected === null || OccasionSelected === undefined)) {  // filter only material
        this.filterModel = new Filter();
        this.filterModel.materialFilter = MaterialSelected;
        this.productService.filterByColor(this.catid, this.filterModel).subscribe(data => {
          const val = localStorage.getItem('productSortType');
          if (val === 'lowtohigh') {
            data.sort((a, b) => {
              return a.sp - b.sp;
            });
            this.productModel = data;
          } else if (val === 'hightolow') {
            data.sort((a, b) => {
              return b.sp - a.sp;
            });
            this.productModel = data;
          } else if (val === undefined || val === null) {
            this.productModel = data;
          }
          this.productModel = data;
          this.productModel.paginator = this.paginator;
          this.productModel = data;
          this.array = data;
          this.totalSize = this.array.length;
          this.iterator();
        }, err => {
          console.log(err);
        });
      } else if ((ColorSelected !== null || ColorSelected !== undefined) &&
        (MaterialSelected === null || MaterialSelected === undefined) &&
        (OccasionSelected === null || OccasionSelected === undefined)) {  // filter only color
        this.filterModel = new Filter();
        this.filterModel.colorFilter = ColorSelected;
        this.productService.filterByColor(this.catid, this.filterModel).subscribe(data => {
          const val = localStorage.getItem('productSortType');
          if (val === 'lowtohigh') {
            data.sort((a, b) => {
              return a.sp - b.sp;
            });
            this.productModel = data;
          } else if (val === 'hightolow') {
            data.sort((a, b) => {
              return b.sp - a.sp;
            });
            this.productModel = data;
          } else if (val === undefined || val === null) {
            this.productModel = data;
          }
          this.productModel = data;
          this.productModel.paginator = this.paginator;
          this.productModel = data;
          this.array = data;
          this.totalSize = this.array.length;
          this.iterator();
        }, err => {
          console.log(err);
        });
      } else if ((OccasionSelected !== null || OccasionSelected !== undefined) &&
        (MaterialSelected === null || MaterialSelected === undefined) &&
        (ColorSelected === null || ColorSelected === undefined)) {  // filter only occasion
        this.filterModel = new Filter();
        this.filterModel.occasionFilter = OccasionSelected;
        this.productService.filterByColor(this.catid, this.filterModel).subscribe(data => {
          const val = localStorage.getItem('productSortType');
          if (val === 'lowtohigh') {
            data.sort((a, b) => {
              return a.sp - b.sp;
            });
            this.productModel = data;
          } else if (val === 'hightolow') {
            data.sort((a, b) => {
              return b.sp - a.sp;
            });
            this.productModel = data;
          } else if (val === undefined || val === null) {
            this.productModel = data;
          }
          this.productModel = data;
          this.productModel.paginator = this.paginator;
          this.productModel = data;
          this.array = data;
          this.totalSize = this.array.length;
          this.iterator();
        }, err => {
          console.log(err);
        });
      } else if ((ColorSelected !== null || ColorSelected !== undefined) && (OccasionSelected !== null || OccasionSelected !== undefined) &&
        (MaterialSelected !== null || MaterialSelected !== undefined)) {  // filter  color , occasion and material
        this.filterModel = new Filter();
        this.filterModel.colorFilter = ColorSelected;
        this.filterModel.materialFilter = MaterialSelected;
        this.filterModel.occasionFilter = OccasionSelected;
        this.productService.filterByColor(this.catid, this.filterModel).subscribe(data => {
          const val = localStorage.getItem('productSortType');
          if (val === 'lowtohigh') {
            data.sort((a, b) => {
              return a.sp - b.sp;
            });
            this.productModel = data;
          } else if (val === 'hightolow') {
            data.sort((a, b) => {
              return b.sp - a.sp;
            });
            this.productModel = data;
          } else if (val === undefined || val === null) {
            this.productModel = data;
          }
          this.productModel = data;
          this.productModel.paginator = this.paginator;
          this.productModel = data;
          this.array = data;
          this.totalSize = this.array.length;
          this.iterator();
        }, err => {
          console.log(err);
        });
      }
    }
  }
  // filter By color
  showColorOptions(e, i) {
    if (e.checked === true) {
      this.selectedCheckBox = i;
      localStorage.setItem('filterColor', e.source.value);
      const MinimumPriceSelected = localStorage.getItem('minimumPriceFilter');
      const MaximumPriceSelected = localStorage.getItem('maximumPriceFilter');
      const OccasionSelected = localStorage.getItem('filterOccasion');
      this.filterModel = new Filter();
      this.filterModel.colorFilter = e.source.value;
      if (MinimumPriceSelected !== null && MaximumPriceSelected !== null) {
        this.filterModel.minimumPriceFilter = +MinimumPriceSelected;
        this.filterModel.maximumPriceFilter = +MaximumPriceSelected;
      } else {
        this.filterModel.minimumPriceFilter = undefined;
        this.filterModel.maximumPriceFilter = undefined;
      }
      this.filterModel.occasionFilter = OccasionSelected;
      this.filterModel.materialFilter = localStorage.getItem('filterMaterial');
      this.productService.filterByColor(this.catid, this.filterModel).subscribe(data => {
        const val = localStorage.getItem('productSortType');
        if (val === 'lowtohigh') {
          data.sort((a, b) => {
            return a.sp - b.sp;
          });
          this.productModel = data;
        } else if (val === 'hightolow') {
          data.sort((a, b) => {
            return b.sp - a.sp;
          });
          this.productModel = data;
        } else if (val === undefined || val === null) {
          this.productModel = data;
        }
        this.productModel = data;
        this.productModel.paginator = this.paginator;
        this.productModel = data;
        this.array = data;
        this.totalSize = this.array.length;
        this.iterator();
      }, err => {
        console.log(err);
      });
    } else if (e.checked === false) {
      localStorage.removeItem('filterColor');
      const MaterialSelected = localStorage.getItem('filterMaterial');
      const MinimumPriceSelected = localStorage.getItem('minimumPriceFilter');
      const MaximumPriceSelected = localStorage.getItem('maximumPriceFilter');
      const OccasionSelected = localStorage.getItem('filterOccasion');
      if ((MinimumPriceSelected !== null && MinimumPriceSelected !== undefined) &&
        (MaximumPriceSelected !== undefined && MaximumPriceSelected !== null)) {
        this.filterModel.minimumPriceFilter = +MinimumPriceSelected;
        this.filterModel.maximumPriceFilter = +MaximumPriceSelected;
      } else if ((MinimumPriceSelected === null || MinimumPriceSelected === undefined || MinimumPriceSelected === '0') &&
        (MaximumPriceSelected === undefined && MaximumPriceSelected === undefined || MaximumPriceSelected === '0')) {
        this.filterModel.minimumPriceFilter = undefined;
        this.filterModel.maximumPriceFilter = undefined;
      }
      if ((MaterialSelected === null || MaterialSelected === undefined) && (OccasionSelected === null || OccasionSelected === undefined) &&
        (MinimumPriceSelected === null || MinimumPriceSelected === undefined) &&
        (MaximumPriceSelected === null || MaximumPriceSelected === undefined)) {
        this.viewAllProducts(); // no filter
      } else if ((MaterialSelected !== null || MaterialSelected !== undefined) &&
        (OccasionSelected !== null || OccasionSelected !== undefined) &&
        (MinimumPriceSelected !== null || MinimumPriceSelected !== undefined) &&
        (MaximumPriceSelected !== null || MaximumPriceSelected !== undefined)) {  // filter material, occasion and price
        this.filterModel = new Filter();
        this.filterModel.occasionFilter = OccasionSelected;
        this.filterModel.materialFilter = MaterialSelected;
        this.filterModel.minimumPriceFilter = +MinimumPriceSelected;
        this.filterModel.maximumPriceFilter = +MaximumPriceSelected;
        this.productService.filterByColor(this.catid, this.filterModel).subscribe(data => {
          const val = localStorage.getItem('productSortType');
          if (val === 'lowtohigh') {
            data.sort((a, b) => {
              return a.sp - b.sp;
            });
            this.productModel = data;
          } else if (val === 'hightolow') {
            data.sort((a, b) => {
              return b.sp - a.sp;
            });
            this.productModel = data;
          } else if (val === undefined || val === null) {
            this.productModel = data;
          }
          this.productModel = data;
          this.productModel.paginator = this.paginator;
          this.productModel = data;
          this.array = data;
          this.totalSize = this.array.length;
          this.iterator();
        }, err => {
          console.log(err);
        });
      } else if ((MaterialSelected !== null || MaterialSelected !== undefined) &&
        (OccasionSelected === null || OccasionSelected === undefined) &&
        (MinimumPriceSelected === null || MinimumPriceSelected === undefined || MinimumPriceSelected === '0') &&
        (MaximumPriceSelected === null || MaximumPriceSelected === undefined || MaximumPriceSelected === '0')) {  // filter only material
        this.filterModel = new Filter();
        this.filterModel.materialFilter = MaterialSelected;
        this.productService.filterByColor(this.catid, this.filterModel).subscribe(data => {
          const val = localStorage.getItem('productSortType');
          if (val === 'lowtohigh') {
            data.sort((a, b) => {
              return a.sp - b.sp;
            });
            this.productModel = data;
          } else if (val === 'hightolow') {
            data.sort((a, b) => {
              return b.sp - a.sp;
            });
            this.productModel = data;
          } else if (val === undefined || val === null) {
            this.productModel = data;
          }
          this.productModel = data;
          this.productModel.paginator = this.paginator;
          this.productModel = data;
          this.array = data;
          this.totalSize = this.array.length;
          this.iterator();
        }, err => {
          console.log(err);
        });
      } else if ((MinimumPriceSelected !== null || MinimumPriceSelected !== undefined) &&
        (MaximumPriceSelected !== null || MaximumPriceSelected !== undefined) &&
        (MaterialSelected === null || MaterialSelected === undefined) &&
        (OccasionSelected === null || OccasionSelected === undefined)) {  // filter only price
        this.filterModel = new Filter();
        this.filterModel.minimumPriceFilter = +MinimumPriceSelected;
        this.filterModel.maximumPriceFilter = +MaximumPriceSelected;
        this.productService.filterByColor(this.catid, this.filterModel).subscribe(data => {
          const val = localStorage.getItem('productSortType');
          if (val === 'lowtohigh') {
            data.sort((a, b) => {
              return a.sp - b.sp;
            });
            this.productModel = data;
          } else if (val === 'hightolow') {
            data.sort((a, b) => {
              return b.sp - a.sp;
            });
            this.productModel = data;
          } else if (val === undefined || val === null) {
            this.productModel = data;
          }
          this.productModel = data;
          this.productModel.paginator = this.paginator;
          this.productModel = data;
          this.array = data;
          this.totalSize = this.array.length;
          this.iterator();
        }, err => {
          console.log(err);
        });
      } else if ((OccasionSelected !== null || OccasionSelected !== undefined) &&
        (MaterialSelected === null || MaterialSelected === undefined) &&
        (MinimumPriceSelected === null || MinimumPriceSelected === undefined || MinimumPriceSelected === '0') &&
        (MaximumPriceSelected === null || MaximumPriceSelected === undefined || MaximumPriceSelected === '0')) {  // filter only occasion
        this.filterModel = new Filter();
        this.filterModel.occasionFilter = OccasionSelected;
        this.productService.filterByColor(this.catid, this.filterModel).subscribe(data => {
          const val = localStorage.getItem('productSortType');
          if (val === 'lowtohigh') {
            data.sort((a, b) => {
              return a.sp - b.sp;
            });
            this.productModel = data;
          } else if (val === 'hightolow') {
            data.sort((a, b) => {
              return b.sp - a.sp;
            });
            this.productModel = data;
          } else if (val === undefined || val === null) {
            this.productModel = data;
          }
          this.productModel = data;
          this.productModel.paginator = this.paginator;
          this.productModel = data;
          this.array = data;
          this.totalSize = this.array.length;
          this.iterator();
        }, err => {
          console.log(err);
        });
      }
    }
  }

  // filter by material
  showMaterialOptions(e, i) {
    if (e.checked === true) {
      this.selectedMaterialCheckBox = i;
      localStorage.setItem('filterMaterial', e.source.value);
      this.filterModel = new Filter();
      const MinimumPriceSelected = localStorage.getItem('minimumPriceFilter');
      const MaximumPriceSelected = localStorage.getItem('maximumPriceFilter');
      const OccasionSelected = localStorage.getItem('filterOccasion');
      this.filterModel.colorFilter = localStorage.getItem('filterColor');
      this.filterModel.occasionFilter = OccasionSelected;
      this.filterModel.materialFilter = e.source.value;
      if ((MinimumPriceSelected !== null && MinimumPriceSelected !== undefined) &&
        (MaximumPriceSelected !== undefined && MaximumPriceSelected !== null)) {
        this.filterModel.minimumPriceFilter = +MinimumPriceSelected;
        this.filterModel.maximumPriceFilter = +MaximumPriceSelected;
      } else if ((MinimumPriceSelected === null || MinimumPriceSelected === undefined) &&
        (MaximumPriceSelected === null || MaximumPriceSelected === undefined)) {
        this.filterModel.minimumPriceFilter = undefined;
        this.filterModel.maximumPriceFilter = undefined;
      }
      this.productService.filterByColor(this.catid, this.filterModel).subscribe(data => {
        const val = localStorage.getItem('productSortType');
        if (val === 'lowtohigh') {
          data.sort((a, b) => {
            return a.sp - b.sp;
          });
          this.productModel = data;
        } else if (val === 'hightolow') {
          data.sort((a, b) => {
            return b.sp - a.sp;
          });
          this.productModel = data;
        } else if (val === undefined || val === null) {
          this.productModel = data;
        }
        this.productModel = data;
        this.productModel.paginator = this.paginator;
        this.productModel = data;
        this.array = data;
        this.totalSize = this.array.length;
        this.iterator();
      }, err => {
        console.log(err);
      });
    } else if (e.checked === false) {
      localStorage.removeItem('filterMaterial');
      const ColorSelected = localStorage.getItem('filterColor');
      const MinimumPriceSelected = localStorage.getItem('minimumPriceFilter');
      const MaximumPriceSelected = localStorage.getItem('maximumPriceFilter');
      const OccasionSelected = localStorage.getItem('filterOccasion');
      if ((MinimumPriceSelected !== null && MinimumPriceSelected !== undefined) &&
        (MinimumPriceSelected !== undefined && MaximumPriceSelected !== null)) {
        this.filterModel.minimumPriceFilter = +MinimumPriceSelected;
        this.filterModel.maximumPriceFilter = +MaximumPriceSelected;
      } else if ((MinimumPriceSelected === null || MinimumPriceSelected === undefined)) {
        this.filterModel.minimumPriceFilter = undefined;
        this.filterModel.maximumPriceFilter = undefined;
      }
      if ((ColorSelected === null || ColorSelected === undefined) && (OccasionSelected === null || OccasionSelected === undefined) &&
        (MinimumPriceSelected === null || MinimumPriceSelected === undefined) &&
        (MaximumPriceSelected === null || MaximumPriceSelected === undefined)) {
        this.viewAllProducts(); // no filter
      } else if ((ColorSelected !== null || ColorSelected !== undefined) && (OccasionSelected === null || OccasionSelected === undefined) &&
        (MinimumPriceSelected === null || MinimumPriceSelected === undefined || MinimumPriceSelected === '0') &&
        (MaximumPriceSelected === null || MaximumPriceSelected === undefined || MaximumPriceSelected === '0')) { // filter only color
        this.filterModel = new Filter();
        this.filterModel.colorFilter = ColorSelected;
        this.productService.filterByColor(this.catid, this.filterModel).subscribe(data => {
          const val = localStorage.getItem('productSortType');
          if (val === 'lowtohigh') {
            data.sort((a, b) => {
              return a.sp - b.sp;
            });
            this.productModel = data;
          } else if (val === 'hightolow') {
            data.sort((a, b) => {
              return b.sp - a.sp;
            });
            this.productModel = data;
          } else if (val === undefined || val === null) {
            this.productModel = data;
          }
          this.productModel = data;
          this.productModel.paginator = this.paginator;
          this.productModel = data;
          this.array = data;
          this.totalSize = this.array.length;
          this.iterator();
        }, err => {
          console.log(err);
        });
      } else if ((MinimumPriceSelected !== null || MinimumPriceSelected !== undefined) &&
        (MaximumPriceSelected !== null || MaximumPriceSelected !== undefined) &&
        (OccasionSelected === null || OccasionSelected === undefined) &&
        (ColorSelected === null || ColorSelected === undefined)) { // filter only price
        this.filterModel = new Filter();
        if (MinimumPriceSelected !== null && MaximumPriceSelected !== null) {
          this.filterModel.minimumPriceFilter = +MinimumPriceSelected;
          this.filterModel.maximumPriceFilter = +MaximumPriceSelected;
        }
        this.productService.filterByColor(this.catid, this.filterModel).subscribe(data => {
          const val = localStorage.getItem('productSortType');
          if (val === 'lowtohigh') {
            data.sort((a, b) => {
              return a.sp - b.sp;
            });
            this.productModel = data;
          } else if (val === 'hightolow') {
            data.sort((a, b) => {
              return b.sp - a.sp;
            });
            this.productModel = data;
          } else if (val === undefined || val === null) {
            this.productModel = data;
          }
          this.productModel = data;
          this.productModel.paginator = this.paginator;
          this.productModel = data;
          this.array = data;
          this.totalSize = this.array.length;
          this.iterator();
        }, err => {
          console.log(err);
        });
      } else if ((MinimumPriceSelected !== null || MinimumPriceSelected !== undefined) &&
        (MaximumPriceSelected !== null || MaximumPriceSelected !== undefined) &&
        (ColorSelected !== null || ColorSelected !== undefined) &&
        (OccasionSelected !== null || OccasionSelected !== undefined)) { // filter price , occassion  and color
        this.filterModel = new Filter();
        if (MinimumPriceSelected !== null && MaximumPriceSelected !== null) {
          this.filterModel.minimumPriceFilter = +MinimumPriceSelected;
          this.filterModel.maximumPriceFilter = +MaximumPriceSelected;
        }
        this.filterModel.colorFilter = ColorSelected;
        this.filterModel.occasionFilter = OccasionSelected;
        this.productService.filterByColor(this.catid, this.filterModel).subscribe(data => {
          const val = localStorage.getItem('productSortType');
          if (val === 'lowtohigh') {
            data.sort((a, b) => {
              return a.sp - b.sp;
            });
            this.productModel = data;
          } else if (val === 'hightolow') {
            data.sort((a, b) => {
              return b.sp - a.sp;
            });
            this.productModel = data;
          } else if (val === undefined || val === null) {
            this.productModel = data;
          }
          this.productModel = data;
          this.productModel.paginator = this.paginator;
          this.productModel = data;
          this.array = data;
          this.totalSize = this.array.length;
          this.iterator();
        }, err => {
          console.log(err);
        });
      }
    }
  }

  // filter by occasion
  showOccasionOptions(e, i) {
    if (e.checked === true) {
      this.selectedOccasionCheckBox = i;
      localStorage.setItem('filterOccasion', e.source.value);
      this.filterModel = new Filter();
      const MinimumPriceSelected = localStorage.getItem('minimumPriceFilter');
      const MaximumPriceSelected = localStorage.getItem('maximumPriceFilter');
      this.filterModel.colorFilter = localStorage.getItem('filterColor');
      this.filterModel.materialFilter = localStorage.getItem('filterMaterial');
      this.filterModel.occasionFilter = e.source.value;
      if ((MinimumPriceSelected !== null && MinimumPriceSelected !== undefined) &&
        (MaximumPriceSelected !== undefined && MaximumPriceSelected !== null)) {
        this.filterModel.minimumPriceFilter = +MinimumPriceSelected;
        this.filterModel.maximumPriceFilter = +MaximumPriceSelected;
      } else if ((MinimumPriceSelected === null || MinimumPriceSelected === undefined) &&
        (MaximumPriceSelected === null || MaximumPriceSelected === undefined)) {
        this.filterModel.minimumPriceFilter = undefined;
        this.filterModel.maximumPriceFilter = undefined;
      }
      this.productService.filterByColor(this.catid, this.filterModel).subscribe(data => {
        const val = localStorage.getItem('productSortType');
        if (val === 'lowtohigh') {
          data.sort((a, b) => {
            return a.sp - b.sp;
          });
          this.productModel = data;
        } else if (val === 'hightolow') {
          data.sort((a, b) => {
            return b.sp - a.sp;
          });
          this.productModel = data;
        } else if (val === undefined || val === null) {
          this.productModel = data;
        }
        this.productModel = data;
        this.productModel.paginator = this.paginator;
        this.productModel = data;
        this.array = data;
        this.totalSize = this.array.length;
        this.iterator();
      }, err => {
        console.log(err);
      });
    } else if (e.checked === false) {
      localStorage.removeItem('filterOccasion');
      const ColorSelected = localStorage.getItem('filterColor');
      const MinimumPriceSelected = localStorage.getItem('minimumPriceFilter');
      const MaximumPriceSelected = localStorage.getItem('maximumPriceFilter');
      const MaterialSelected = localStorage.getItem('filterMaterial');
      if ((MinimumPriceSelected !== null && MinimumPriceSelected !== undefined) &&
        (MinimumPriceSelected !== undefined && MaximumPriceSelected !== null)) {
        this.filterModel.minimumPriceFilter = +MinimumPriceSelected;
        this.filterModel.maximumPriceFilter = +MaximumPriceSelected;
      } else if ((MinimumPriceSelected === null || MinimumPriceSelected === undefined)) {
        this.filterModel.minimumPriceFilter = undefined;
        this.filterModel.maximumPriceFilter = undefined;
      }
      if ((ColorSelected === null || ColorSelected === undefined) && (MaterialSelected === null || MaterialSelected === undefined) &&
        (MinimumPriceSelected === null || MinimumPriceSelected === undefined) &&
        (MaximumPriceSelected === null || MaximumPriceSelected === undefined)) {
        this.viewAllProducts(); // no filter
      } else if ((ColorSelected !== null || ColorSelected !== undefined) && (MaterialSelected === null || MaterialSelected === undefined) &&
        (MinimumPriceSelected === null || MinimumPriceSelected === undefined || MinimumPriceSelected === '0') &&
        (MaximumPriceSelected === null || MaximumPriceSelected === undefined || MaximumPriceSelected === '0')) { // filter only color
        this.filterModel = new Filter();
        this.filterModel.colorFilter = ColorSelected;
        this.productService.filterByColor(this.catid, this.filterModel).subscribe(data => {
          const val = localStorage.getItem('productSortType');
          if (val === 'lowtohigh') {
            data.sort((a, b) => {
              return a.sp - b.sp;
            });
            this.productModel = data;
          } else if (val === 'hightolow') {
            data.sort((a, b) => {
              return b.sp - a.sp;
            });
            this.productModel = data;
          } else if (val === undefined || val === null) {
            this.productModel = data;
          }
          this.productModel = data;
          this.productModel.paginator = this.paginator;
          this.productModel = data;
          this.array = data;
          this.totalSize = this.array.length;
          this.iterator();
        }, err => {
          console.log(err);
        });
      } else if ((MinimumPriceSelected !== null || MinimumPriceSelected !== undefined) &&
        (MaximumPriceSelected !== null || MaximumPriceSelected !== undefined) &&
        (ColorSelected === null || ColorSelected === undefined) &&
        (MaterialSelected === null || MaterialSelected === undefined)) { // filter only price
        this.filterModel = new Filter();
        if (MinimumPriceSelected !== null && MaximumPriceSelected !== null) {
          this.filterModel.minimumPriceFilter = +MinimumPriceSelected;
          this.filterModel.maximumPriceFilter = +MaximumPriceSelected;
        }
        this.productService.filterByColor(this.catid, this.filterModel).subscribe(data => {
          const val = localStorage.getItem('productSortType');
          if (val === 'lowtohigh') {
            data.sort((a, b) => {
              return a.sp - b.sp;
            });
            this.productModel = data;
          } else if (val === 'hightolow') {
            data.sort((a, b) => {
              return b.sp - a.sp;
            });
            this.productModel = data;
          } else if (val === undefined || val === null) {
            this.productModel = data;
          }
          this.productModel = data;
          this.productModel.paginator = this.paginator;
          this.productModel = data;
          this.array = data;
          this.totalSize = this.array.length;
          this.iterator();
        }, err => {
          console.log(err);
        });
      } else if ((ColorSelected === null || ColorSelected === undefined) && (MaterialSelected !== null || MaterialSelected !== undefined) &&
        (MinimumPriceSelected === null || MinimumPriceSelected === undefined || MinimumPriceSelected === '0') &&
        (MaximumPriceSelected === null || MaximumPriceSelected === undefined || MaximumPriceSelected === '0')) { // filter only material
        this.filterModel = new Filter();
        this.filterModel.materialFilter = MaterialSelected;
        this.productService.filterByColor(this.catid, this.filterModel).subscribe(data => {
          const val = localStorage.getItem('productSortType');
          if (val === 'lowtohigh') {
            data.sort((a, b) => {
              return a.sp - b.sp;
            });
            this.productModel = data;
          } else if (val === 'hightolow') {
            data.sort((a, b) => {
              return b.sp - a.sp;
            });
            this.productModel = data;
          } else if (val === undefined || val === null) {
            this.productModel = data;
          }
          this.productModel = data;
          this.productModel.paginator = this.paginator;
          this.productModel = data;
          this.array = data;
          this.totalSize = this.array.length;
          this.iterator();
        }, err => {
          console.log(err);
        });
      } else if ((MinimumPriceSelected !== null || MinimumPriceSelected !== undefined) &&
        (MaximumPriceSelected !== null || MaximumPriceSelected !== undefined) &&
        (ColorSelected !== null || ColorSelected !== undefined) &&
        (MaterialSelected !== null || MaterialSelected !== undefined)) { // filter price material and color
        this.filterModel = new Filter();
        if (MinimumPriceSelected !== null && MaximumPriceSelected !== null) {
          this.filterModel.minimumPriceFilter = +MinimumPriceSelected;
          this.filterModel.maximumPriceFilter = +MaximumPriceSelected;
        }
        this.filterModel.materialFilter = MaterialSelected;
        this.filterModel.colorFilter = ColorSelected;
        this.productService.filterByColor(this.catid, this.filterModel).subscribe(data => {
          const val = localStorage.getItem('productSortType');
          if (val === 'lowtohigh') {
            data.sort((a, b) => {
              return a.sp - b.sp;
            });
            this.productModel = data;
          } else if (val === 'hightolow') {
            data.sort((a, b) => {
              return b.sp - a.sp;
            });
            this.productModel = data;
          } else if (val === undefined || val === null) {
            this.productModel = data;
          }
          this.productModel = data;
          this.productModel.paginator = this.paginator;
          this.productModel = data;
          this.array = data;
          this.totalSize = this.array.length;
          this.iterator();
        }, err => {
          console.log(err);
        });
      }
    }
  }
}
