import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private baseUrl = 'http://localhost:8080/api/stock';

  constructor(private http: HttpClient) {}

  // ✅ Get all stock
  getAllStock(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  // ✅ Filter by category
  getStockByCategory(category: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/category/${category}`);
  }

  // ✅ Filter by product
  getStockByProduct(product: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/product/${product}`);
  }
}
