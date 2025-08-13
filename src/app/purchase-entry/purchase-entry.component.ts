import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-purchase-entry',
  templateUrl: './purchase-entry.component.html',
  styleUrls: ['./purchase-entry.component.scss'],
})
export class PurchaseEntryComponent {
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
    details: '',
  };

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
    'details',
    'actions',
  ];

  getTotalAmount(): number {
    return this.purchaseItems.reduce((acc, item) => acc + item.total, 0);
  }

  printOrder() {
    window.print();
  }
}
