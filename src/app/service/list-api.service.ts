import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListApiService {

 private apiUrl = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) {}

  getAllSellItem(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+'sell-order-items-sp');
  }
 
  getAllPurchaseItem(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+'purchase-order-items-sp');
  }

  getStockDetails(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+'stock');
  }

  getParticularStock(id : number): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+'stock/particular-stock'+{id});
  }
  
}
