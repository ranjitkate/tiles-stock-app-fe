import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from '../service/category.service';
import { SizeService } from '../service/size.service';

@Component({
  selector: 'app-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.scss']
})
export class SizeComponent implements OnInit {
  showTable = true;
  editMode = false;
  sizeForm!: FormGroup;
  dataSource = new MatTableDataSource<any>();
  categories: any[] = [];
  displayedColumns: string[] = ['size', 'category', 'actions'];

  constructor(
    private fb: FormBuilder,
    private sizeService: SizeService,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.loadSizes();
    this.loadCategories();
    this.sizeForm = this.fb.group({
      size: ['', Validators.required],
      categoryId: ['', Validators.required]
    });
  }

  loadSizes() {
    this.sizeService.getAll().subscribe(sizes => {
      this.dataSource.data = sizes || [];
    });
  }

  loadCategories() {
    this.categoryService.getAll().subscribe(res => {
      this.categories = res;
    });
  }

  onSubmit() {
    if (this.sizeForm.invalid) return;
    const payload = {
      size: this.sizeForm.value.size,
      category: {
        id: this.sizeForm.value.categoryId
      }
    };

    if (this.editMode) {
     this.sizeService.patchSize(this.sizeForm.value.id, payload).subscribe(() => {
        this.loadSizes();
        this.cancelEdit();
      });
      return;
    }

    this.sizeService.addSize(payload).subscribe(() => {
      this.loadSizes();
      this.sizeForm.reset();
    });

    console.log("Form submitted");
  }

  cancelEdit() {
    this.sizeForm.reset();
    this.showTable = true;
  }

  editSize(size: any) {
    this.showTable = false;
    this.editMode = true;
    this.sizeForm.patchValue({
      size: size.size,
      categoryId: size.category.id
    });
  }

  deleteProduct(sizeId: number) {
    console.log("Delete product with ID:", sizeId);
    this.sizeService.deleteSize(sizeId).subscribe(() => {
      this.loadSizes();
    });
  }
}
