import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellOrderService {

  private apiUrl = 'http://localhost:8080/api/sell-orders';
  private productUrl = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) {}

  getSellOrders(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addSellOrder(order: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, order);
  }

  deleteSellOrder(orderId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${orderId}`);
  }

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.productUrl);
  }
}


