import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SizeService {

  private apiUrl = 'http://localhost:8080/api/size';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getBySize(sizeId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/size/${sizeId}`);
  }

  patchSize(id: number, size: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, size);
  }

  addSize(size: any): Observable<any> {
    return this.http.post(this.apiUrl, size);
  }

  deleteSize(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
