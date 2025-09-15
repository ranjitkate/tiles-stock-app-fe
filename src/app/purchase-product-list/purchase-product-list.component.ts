import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LabelService } from '../service/label.service';
import { ListApiService } from '../service/list-api.service';

@Component({
  selector: 'app-purchase-product-list',
  templateUrl: './purchase-product-list.component.html',
  styleUrls: ['./purchase-product-list.component.scss']
})
export class PurchaseProductListComponent {

    displayedColumns: string[] = [
      'orderId', 'productName','categoryName', 'size', 'type','vendorName', 'weight', 'price', 'total','quantity', 'deliveryDate', 'orderDate','actions'
    ];
  
    dataSource = new MatTableDataSource<any>([]);
    columnFilters: { [key: string]: string } = {};
  
    @ViewChild(MatPaginator) paginator!: MatPaginator;
  
    constructor(private listService : ListApiService, private labelService : LabelService ) { }
  
    ngOnInit(): void {
      // Example static data (replace with API response)
      this.dataSource.data = []
      this.loadItems();
      // Custom filter logic
      this.dataSource.filterPredicate = (data, filter) => {
        const searchTerms = JSON.parse(filter);
        return Object.keys(searchTerms).every(col => {
          return searchTerms[col] === '' || (data[col] + '').toLowerCase().includes(searchTerms[col].toLowerCase());
        });
      };
    }
  
    loadItems() {
      this.listService.getAllPurchaseItem().subscribe(data => {
        this.dataSource.data = data;
      });
    }
  
    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
    }
  
    applyColumnFilter(event: Event, column: string) {
      const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
      this.columnFilters[column] = filterValue;
      this.dataSource.filter = JSON.stringify(this.columnFilters); // ✅ apply filter
    }

    generateLabel(element: any) {
      const item = {
        category: element.categoryName,
        product: element.productName,
        code: element.orderId,
        size: element.size,
        weight : element.weight,
        quantity: element.quantity,
        price: element.price,
        type: element.type,
      };
      
      
      this.labelService.generateProductLabels(item);
    }



}
