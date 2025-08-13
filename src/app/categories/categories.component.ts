import { Component } from '@angular/core';

interface Category {
  name: string;
  description: string;
  status: 'Active' | 'Inactive';
}

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})

export class CategoriesComponent {
  categories: Category[] = [
    { name: 'Wall Tiles', description: 'Tiles suitable for walls', status: 'Active' },
    { name: 'Floor Tiles', description: 'Durable tiles for flooring', status: 'Inactive' },
    { name: 'Bathroom Tiles', description: 'Water-resistant bathroom tiles', status: 'Active' },
  ];
  newCategory: Category = { name: '', description: '', status: 'Active' };

  addCategory() {
    if (this.newCategory.name.trim()) {
      this.categories.push({ ...this.newCategory });
      this.newCategory = { name: '', description: '', status: 'Active' };
    }
  }

  deleteCategory(index: number) {
    this.categories.splice(index, 1);
  }

  editCategory(index: number) {
    this.newCategory = { ...this.categories[index] };
    this.deleteCategory(index);
  }
}