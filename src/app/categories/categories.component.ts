import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from '../service/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categoryForm!: FormGroup;
  displayedColumns: string[] = ['id', 'name', 'code', 'description', 'status', 'actions'];
  dataSource = new MatTableDataSource<any>();
  editMode = false;
  editCategoryId: number | null = null;

  constructor(private fb: FormBuilder, private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      code: [''],
      description: [''],
      status: [true]
    });
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getAll().subscribe(data => this.dataSource.data = data);
  }

  onSubmit() {
    if (this.categoryForm.invalid) return;
    if (this.editMode) {
      this.categoryService.update(this.editCategoryId!, this.categoryForm.value).subscribe(() => {
        this.loadCategories();
        this.cancelEdit();
      });
    } else {
      this.categoryService.create(this.categoryForm.value).subscribe(() => {
        this.loadCategories();
        this.categoryForm.reset({ status: true });
      });
    }
  }

  editCategory(category: any) {
    this.editMode = true;
    this.editCategoryId = category.id;
    this.categoryForm.patchValue(category);
  }

  cancelEdit() {
    this.editMode = false;
    this.editCategoryId = null;
    this.categoryForm.reset({ status: true });
  }

  deleteCategory(id: number) {
    this.categoryService.delete(id).subscribe(() => this.loadCategories());
  }

  toggleStatus(category: any) {
    category.status = !category.status;
    this.categoryService.update(category.id, category).subscribe();
  }
}