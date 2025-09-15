import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

    private apiUrl = 'http://localhost:8080/api/purchase-orders'; // your backend API

  constructor(private http: HttpClient) {}

  // Save purchase order
  savePurchase(purchase: any): Observable<any> {
    return this.http.post(this.apiUrl, purchase);
  }

 

  // Get all purchases
  getPurchases(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Delete purchase
  deletePurchase(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
