import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  product: any = {
    name: '',
    code: '',
    size: '',
    price: ''
  };
  selectedFile: File | null = null;

  products: any[] = [];
  showTable = true;

  displayedColumns: string[] = ['name', 'code', 'size', 'price', 'image'];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('name', this.product.name);
    formData.append('code', this.product.code);
    formData.append('size', this.product.size);
    formData.append('price', this.product.price.toString());

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    // this.productService.addProduct(formData).subscribe(() => {
    //   this.loadProducts();
    //   this.product = { name: '', code: '', size: '', price: '' };
    //   this.selectedFile = undefined as any;
    // });
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe((data: any[]) => {
      this.products = data;
    });
  }

}
