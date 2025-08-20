import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { SellOrderService } from '../service/sell-order.service';


@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})

export class CreateOrderComponent {
  purchaseItems: any[] = [];
  dataSource = new MatTableDataSource<any>(this.purchaseItems);
  editingIndex: number | null = null;
  gstEnabled : boolean = false;
  newItem = {
    category: '',
    product: '',
    code : '',
    size: '',
    quantity: 0,
    price: 0,
    total: 0,
    type: '',
    details: '',
  };
  customer_name: string = '';
  customer_phone: string = '';
  customer_Address: string = '';
  order_date: Date = new Date();
  delivery_date: Date = new Date();
  constructor(private SellOrderService: SellOrderService) {}

  categoryList = ['Tiles', 'Cement', 'Paint'];
  productListMap: { [key: string]: string[] } = {
    Tiles: ['Floor Tile', 'Wall Tile'],
    Cement: ['Ultratech', 'Ambuja'],
    Paint: ['Asian Paints', 'Berger']
  };

  get productList() {
    return this.productListMap[this.newItem.category] || [];
  }

  addItem() {
    const total = this.newItem.quantity * this.newItem.price;
    this.purchaseItems.push({ ...this.newItem, total });
    this.dataSource.data = [...this.purchaseItems];
    this.resetItem();
  }

  editItem(index: number) {
    this.editingIndex = index;
    const item = this.purchaseItems[index];
    this.newItem = { ...item };
  }

  saveEdit() {
    if (this.editingIndex !== null) {
      const total = this.newItem.quantity * this.newItem.price;
      this.purchaseItems[this.editingIndex] = { ...this.newItem, total };
      this.dataSource.data = [...this.purchaseItems];
      this.editingIndex = null;
      this.resetItem();
    }
  }

  deleteItem(index: number) {
    if (confirm('Are you sure you want to delete this item?')) {
      this.purchaseItems.splice(index, 1);
      this.dataSource.data = [...this.purchaseItems];
    }
  }

  resetItem() {
    this.newItem = {
      category: '',
      product: '',
      code : '',
      size: '',
      quantity: 0,
      price: 0,
      total: 0,
      type: '',
      details: '',
    };
  }

  displayedColumns: string[] = [
    'category',
    'product',
    'size',
    'quantity',
    'price',
    'total',
    'type',
    'actions',
  ];

  getTotalAmount(): number {
    return this.purchaseItems.reduce((acc, item) => acc + item.total, 0);
  }
  

  saveOrderToDb() {
  const order = {
    customerName : this.customer_name,
    customerPhone : this.customer_phone,
    customerAddress : this.customer_Address,
    orderDate: this.order_date,
    deliveryDate: this.delivery_date,
    totalAmount: this.getTotalAmount(),
    items: this.purchaseItems
  };

  this.SellOrderService.addSellOrder(order).subscribe({
    next: (response) => {
      console.log('Order saved:', response);
      alert('Order saved successfully!');
    },
    error: (err) => {
      console.error('Error saving order:', err);
    }
  });
}


  printOrder() {
    window.print();
  }
  }



