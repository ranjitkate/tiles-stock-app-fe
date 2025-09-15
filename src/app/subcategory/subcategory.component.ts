import { Component , OnInit} from '@angular/core';
import { SubcategoryService } from '../service/subcategory.service';
import { CategoryService } from '../service/category.service'; // assuming you already have category service
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.scss']
})


export class SubcategoryComponent implements OnInit {
  subcategories: any[] = [];
  categories: any[] = [];
  dataSource = new MatTableDataSource<any>(this.subcategories);

  newSubCategory = {
    name: '',
    categoryId: null
  };

  displayedColumns: string[] = ['name', 'category', 'actions'];

  constructor(
    private subCategoryService: SubcategoryService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.loadCategories();
    this.loadSubCategories();
  }

  loadCategories() {
    this.categoryService.getAll().subscribe(res => {
      this.categories = res;
    });
  }

  loadSubCategories() {
    this.subCategoryService.getAll().subscribe(res => {
      this.subcategories = res;
      this.dataSource.data = res;
    });
  }

  addSubCategory() {
    const payload = {
      name: this.newSubCategory.name,
      category: {
        id: this.newSubCategory.categoryId
      }
    };
    
    this.subCategoryService.addSubCategory(payload).subscribe(res => {
      this.subcategories.push(res);
      this.loadSubCategories();
      this.newSubCategory = { name: '', categoryId: null };
    });
  }

  deleteSubCategory(id: number) {
    if (confirm('Are you sure to delete?')) {
      this.subCategoryService.deleteSubCategory(id).subscribe(() => {
        this.subcategories = this.subcategories.filter(sc => sc.id !== id);
        this.dataSource.data = [...this.subcategories];
      });
    }
  }
}
