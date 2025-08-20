import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../service/product.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  productForm!: FormGroup;
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [
    'productCode','name','size','price','stockQuantity','category','vendorId','status','image','actions'
  ];

  categories: any[] = [];
  vendors: any[] = [];

  editMode = false;
  editId: number | null = null;
  showTable = true;
  selectedFile: File | null = null;


  selectedImageFile: File | null = null;
  imagePreview: string | null = null;


  constructor(private fb: FormBuilder, private productService: ProductService, private http: HttpClient) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      description: [''],
      size: [''],
      price: ['', Validators.required],
      stockQuantity: ['', Validators.required],
      category: ['', Validators.required],
      vendorId: ['', Validators.required],
      status: [true]
    });

    this.loadLookups();
    this.loadProducts();
  }

  loadLookups() {
    this.productService.getCategories().subscribe(d => this.categories = d || []);
    this.productService.getVendors().subscribe(d => this.vendors = d || []);
  }

  loadProducts() {
    this.productService.getAll().subscribe(d => this.dataSource.data = d || []);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files?.[0];
    if (!file) { this.selectedImageFile = null; this.imagePreview = null; return; }
    this.selectedImageFile = file;
    const reader = new FileReader();
    reader.onload = () => this.imagePreview = reader.result as string;
    reader.readAsDataURL(file);
  }

  onSubmit() {
    if (this.productForm.invalid) return;

    const payload = this.productForm.value; // JSON fields
    this.productService.save(payload, this.selectedImageFile).subscribe(() => {
      this.resetForm();
      this.loadProducts();
    });
  }

  editProduct(p: any) {
    this.editMode = true;
    this.editId = p.id;
    this.productForm.patchValue({
      code: p.productCode,
      name: p.name,
      description: p.description,
      size: p.size,
      price: p.price,
      stockQuantity: p.stockQuantity,
      category: p.category,
      vendorId: p.vendorId,
      status: p.status
    });
    // image remains unchanged unless user selects a new file
    this.imagePreview = p.image ? this.asImageSrc(p.image) : null;
    this.selectedImageFile = null;
  }

  cancelEdit() {
    this.resetForm();
  }

  resetForm() {
    this.editMode = false;
    this.editId = null;
    this.productForm.reset({ status: true });
    this.selectedImageFile = null;
    this.imagePreview = null;
  }

  deleteProduct(id: number) {
    this.productService.delete(id).subscribe(() => this.loadProducts());
  }

  toggleStatus(p: any) {
    const updated = { ...p, status: !p.status };
    this.productService.update(p.id, updated, null).subscribe(() => this.loadProducts());
  }

  displayCategory(id: number) {
    return this.categories.find(c => c.id === id)?.name || id;
  }
  displayVendor(id: number) {
    return this.vendors.find(v => v.id === id)?.name || id;
  }

  asImageSrc(base64: string) { return `data:image/*;base64,${base64}`; }



}
