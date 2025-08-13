import { Component } from '@angular/core';

interface Product {
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'Available' | 'Out of Stock';
}

interface Category {
  name: string;
  description: string;
  status: 'Active' | 'Inactive';
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
    products: Product[] = [
    { name: 'Glossy White Tile', category: 'Wall Tiles', price: 40, stock: 120, status: 'Available' },
    { name: 'Rustic Brown Tile', category: 'Floor Tiles', price: 55, stock: 60, status: 'Available' },
    { name: 'Matte Grey Tile', category: 'Bathroom Tiles', price: 48, stock: 0, status: 'Out of Stock' },
  ];

  categories: Category[] = [
    { name: 'Wall Tiles', description: 'Tiles suitable for walls', status: 'Active' },
    { name: 'Floor Tiles', description: 'Durable tiles for flooring', status: 'Inactive' },
    { name: 'Bathroom Tiles', description: 'Water-resistant bathroom tiles', status: 'Active' },
  ];

   newProduct: Product = {
    name: '',
    category: '',
    price: 0,
    stock: 0,
    status: 'Available'
  };

  addProduct() {
    if (this.newProduct.name.trim() && this.newProduct.category.trim()) {
      this.products.push({ ...this.newProduct });
      this.newProduct = { name: '', category: '', price: 0, stock: 0, status: 'Available' };
    }
  }

  deleteProduct(index: number) {
    this.products.splice(index, 1);
  }

  editProduct(index: number) {
    this.newProduct = { ...this.products[index] };
    this.deleteProduct(index);
  }

}
