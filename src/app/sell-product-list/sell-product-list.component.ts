import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ListApiService } from '../service/list-api.service';

@Component({
  selector: 'app-sell-product-list',
  templateUrl: './sell-product-list.component.html',
  styleUrls: ['./sell-product-list.component.scss']
})
export class SellProductListComponent implements OnInit {

  displayedColumns: string[] = [
    'batchId', 'product', 'size', 'weight', 'price', 'quantity', 'deliveryDate'
  ];

  dataSource = new MatTableDataSource<any>([]);
  columnFilters: { [key: string]: string } = {};

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private listService: ListApiService,) { }

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
    this.listService.getAllSellItem().subscribe(data => {
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


}
