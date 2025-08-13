import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  categoryId: number;
  price: number;
}

interface OrderItem {
  categoryId: number;
  productId: number;
  quantity: number;
  price: number;
}

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



  customerName = '';
  contact = '';
  address = '';
  orderDate = new Date().toISOString().split('T')[0];
  deliveryDate?: string;
  paymentStatus: 'Pending' | 'Paid' = 'Pending';
  orderStatus: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled' = 'Pending';
  remarks = '';

  categories: Category[] = [
    { id: 1, name: 'Wall Tiles' },
    { id: 2, name: 'Floor Tiles' }
  ];

  products: Product[] = [
    { id: 1, name: 'Glossy White Tile', categoryId: 1, price: 40 },
    { id: 2, name: 'Rustic Brown Tile', categoryId: 1, price: 55 },
    { id: 3, name: 'Matte Grey Tile', categoryId: 2, price: 48 }
  ];

  orderItems: OrderItem[] = [
    { categoryId: 0, productId: 0, quantity: 1, price: 0 }
  ];

  getFilteredProducts(categoryId: number): Product[] {
    return this.products.filter(p => p.categoryId === categoryId);
  }

  onProductChange(index: number) {
    const item = this.orderItems[index];
    const selectedProduct = this.products.find(p => p.id === item.productId);
    item.price = selectedProduct ? selectedProduct.price : 0;
  }

  addOrderItem() {
    this.orderItems.push({ categoryId: 0, productId: 0, quantity: 1, price: 0 });
  }

  removeOrderItem(index: number) {
    if (this.orderItems.length > 1) {
      this.orderItems.splice(index, 1);
    }
  }

  getTotal(): number {
    return this.orderItems.reduce((total, item) => total + item.quantity * item.price, 0);
  }

  submitOrder() {
    const newOrder = {
      customerName: this.customerName,
      contact: this.contact,
      orderDate: this.orderDate,
      deliveryDate: this.deliveryDate,
      paymentStatus: this.paymentStatus,
      orderStatus: this.orderStatus,
      remarks: this.remarks,
      items: this.orderItems,
      total: this.getTotal()
    };
    console.log('Order submitted:', newOrder);
  }
}


