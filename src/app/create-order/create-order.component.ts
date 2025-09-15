import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { SellOrderService } from '../service/sell-order.service';
import { ProductService } from '../service/product.service';
import { SizeService } from '../service/size.service';
import { CategoryService } from '../service/category.service';
import { PdfService } from '../service/pdf.service';
import { LabelService } from '../service/label.service';


@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})

export class CreateOrderComponent {
  purchaseItems: any[] = [];
  dataSource = new MatTableDataSource<any>(this.purchaseItems);
  editingIndex: number | null = null;
  gstEnabled: boolean = false;
  newItem = {
    category: '',
    product: '',
    code: '',
    size: '',
    weight : '',
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

  constructor(private SellOrderService: SellOrderService, private categoryService: CategoryService, private productService: ProductService
    , private sizeService: SizeService, private pdfService: PdfService, private labelService: LabelService
  ) { }

  categoryList: any = [];
  productListMap: any = [];
  sizeList: any = [];
  weight = [{
    id : 1,
    name : '10 KG'
  },
  {
    id : 2,
    name : '20 KG'
  },
  {
    id : 3,
    name : '25 KG'
  },
  {
    id : 4,
    name : '50 KG'  
  }]

  typeList = [{
    id : 1,
    name : 'Type 1' 
  },{
    id :2 ,
    name : 'Type 2'
  }
]

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(d => this.categoryList = d || []);
    this.sizeService.getAll().subscribe(d => this.sizeList = d || []);
    this.productService.getAll().subscribe(d => this.productListMap = d || []);
  }



  addItem() {
    const total = this.newItem.quantity * this.newItem.price;

     // find actual names from your lists
  const category = this.categoryList.find((c: any) => c.id === this.newItem.category);
  const product = this.productListMap.find((p: any) => p.id === this.newItem.product);
  const size = this.sizeList.find((s: any) => s.id === this.newItem.size);

  this.purchaseItems.push({
    ...this.newItem,
    total,
    categoryName: category ? category.name : this.newItem.category,
    productName: product ? product.name : this.newItem.product,
    sizeName: size ? size.size : this.newItem.size
  });
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
      code: '',
      size: '',
      weight : '',
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
      customerName: this.customer_name,
      customerPhone: this.customer_phone,
      customerAddress: this.customer_Address,
      orderDate: this.order_date,
      deliveryDate: this.delivery_date,
      totalAmount: this.getTotalAmount(),
      items: this.purchaseItems
    };

    this.SellOrderService.addSellOrder(order).subscribe({
      next: (response) => {
        console.log('Order saved:', response);
        alert('Order saved successfully!');
        this.pdfService.generateSellOrderPdf(response);

      },
      error: (err) => {
        console.error('Error saving order:', err);
      }
    });
  }




  printOrder() {
    const order = {
      id: 101,
      customer: 'Ramesh Sharma',
      contact: '9876543210',
      orderDate: '2025-09-07',
      deliveryDate: '2025-09-10',
      totalAmount: 5000,
      items: [
        {
          product: 'Tile A - Glossy White',
          size: '2x2',
          quantity: 10,
          price: 200,
          total: 2000
        },
        {
          product: 'Tile B - Matte Grey',
          size: '4x4',
          quantity: 15,
          price: 200,
          total: 3000
        }
      ]
    };


    this.pdfService.generateSellOrderPdf(order);
  }

  labelInvoice(i : any){
    console.log("Label Invoice Clicked", i);
     const item = this.purchaseItems[i];
    const purchase = {
    batchId: 'BATCH-2025-09-07-01',
    product: 'Ambuja Cement',
    size: item.size ,
    weight: '50 KG',
    price: item.price,
    quantity: item.quantity,
    purchaseDate: '2025-09-07'
  };
    
    this.labelService.generateProductLabels(purchase);
  }



}



