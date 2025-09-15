import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../service/product.service';
import { SizeService } from '../service/size.service';
import { CategoryService } from '../service/category.service';
import { PurchaseService } from '../service/purchase.service';

@Component({
  selector: 'app-purchase-entry',
  templateUrl: './purchase-entry.component.html',
  styleUrls: ['./purchase-entry.component.scss'],
})
export class PurchaseEntryComponent implements OnInit {
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
    vendor_name: string = '';
    vendor_phone: string = '';
    vendor_Address: string = '';
    order_date: Date = new Date();
    delivery_date: Date = new Date();
    vendor : string = '';
  
    constructor( private categoryService : CategoryService, private productService : ProductService
      , private sizeService : SizeService, private purchaseService : PurchaseService
    ) {}
  
    categoryList : any = [];
    productListMap: any = [];
    sizeList : any = [];
    vendorList : any = [];
  
  ngOnInit(): void {
   this.categoryService.getAll().subscribe(d => this.categoryList = d || []);
   this.productService.getAll().subscribe(d => this.sizeList = d || []);
   this.productService.getAll().subscribe(d => this.productListMap = d || []);
   this.productService.getVendors().subscribe(d => this.vendorList = d || []);
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
    const purchase = {
      vendorName : this.vendor_name,
      vendorPhone : this.vendor_phone,
      vendorAddress : this.vendor_Address,
      orderDate: this.order_date,
      deliveryDate: this.delivery_date,
      totalAmount: this.getTotalAmount(),
      items: this.purchaseItems
    };
   

    this.purchaseService.savePurchase(purchase).subscribe({
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
