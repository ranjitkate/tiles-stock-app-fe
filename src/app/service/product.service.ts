import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private api = 'http://localhost:8080/api/products';
  private catApi = 'http://localhost:8080/api/categories';
  private venApi = 'http://localhost:8080/api/vendors';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any[]> { return this.http.get<any[]>(this.api); }
  getCategories(): Observable<any[]> { return this.http.get<any[]>(this.catApi); }
  getVendors(): Observable<any[]> { return this.http.get<any[]>(this.venApi); }

  save(product: any, imageFile: File | null): Observable<any> {
    const formData = new FormData();
    Object.keys(product).forEach(k => formData.append(k, product[k] ?? ''));
    if (imageFile) formData.append('file', imageFile);

    // If editing, backend should infer by product.id or separate PUT endpoint
    if (product.id) {
      return this.http.put(`${this.api}/${product.id}`, formData);
    }
    return this.http.post(this.api + '/add', formData);
  }

  update(id: number, product: any, imageFile: File | null): Observable<any> {
    const formData = new FormData();
    Object.keys(product).forEach(k => formData.append(k, product[k] ?? ''));
    if (imageFile) formData.append('image', imageFile);
    return this.http.put(`${this.api}/${id}`, formData);
  }

  delete(id: number): Observable<any> { return this.http.delete(`${this.api}/${id}`); }
}
