import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { StockService } from '../service/stock.service';
import { ListApiService } from '../service/list-api.service';


@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent {
displayedColumns: string[] = ['stockCode','categoryId', 'productId', 'size','weight', 'type', 'quantity'];
  dataSource = new MatTableDataSource<any>([]);
  
  // filter values
  categoryFilter: string = '';
  productFilter: string = '';
  sizeFilter: string = '';
  typeFilter: string = '';
  weightFilter : string = ''; 

  constructor(private listService: ListApiService) {}

  ngOnInit(): void {
    this.fetchStock();
  }

  fetchStock() {
    this.listService.getStockDetails().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  applyFilter() {
    this.dataSource.filterPredicate = (data, filter) => {
      const searchTerms = JSON.parse(filter);
      return (!searchTerms.categoryId || data.categoryId.toLowerCase().includes(searchTerms.categoryId.toLowerCase())) &&
             (!searchTerms.productId || data.productId.toLowerCase().includes(searchTerms.productId.toLowerCase())) &&
             (!searchTerms.size || data.size.toLowerCase().includes(searchTerms.size.toLowerCase())) &&
             (!searchTerms.type || data.type.toLowerCase().includes(searchTerms.type.toLowerCase()));
    };

    this.dataSource.filter = JSON.stringify({
      categoryId: this.categoryFilter,
      productId: this.productFilter,
      size: this.sizeFilter,
      type: this.typeFilter,
      weight : this.weightFilter
    });
  }

}



