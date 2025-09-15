import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface SellOrder {
  orderId: string;
  customer: string;
  contact: string;
  items: { product: string; qty: number }[];
  orderDate: Date;
  deliveryDate: Date;
  payment: string;
  status: string;
  total: number;
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})

export class OrdersComponent {
  displayedColumns: string[] = [
    'orderId', 'customer', 'contact', 'items', 
    'orderDate', 'deliveryDate', 'payment', 'status', 'total'
  ];

  dataSource = new MatTableDataSource<SellOrder>([]);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;



  ngOnInit(): void {
    // Dummy Data (replace with API call)
    this.dataSource.data = [
      {
        orderId: 'SO-1001',
        customer: 'Rahul Sharma',
        contact: '9876543210',
        items: [{ product: 'Tile A', qty: 10 }, { product: 'Tile B', qty: 5 }],
        orderDate: new Date(),
        deliveryDate: new Date(new Date().setDate(new Date().getDate() + 5)),
        payment: 'Paid',
        status: 'Delivered',
        total: 15000
      },
      {
        orderId: 'SO-1002',
        customer: 'Priya Singh',
        contact: '9123456780',
        items: [{ product: 'Tile C', qty: 20 }],
        orderDate: new Date(),
        deliveryDate: new Date(new Date().setDate(new Date().getDate() + 7)),
        payment: 'Pending',
        status: 'Processing',
        total: 20000
      }
    ];
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
