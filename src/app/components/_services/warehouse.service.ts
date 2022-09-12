import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../_services/token-storage.service';

const API_URL = 'https://localhost:7132/api/warehouse';

@Injectable({
  providedIn: 'root',
})
export class WarehouseService {
  constructor(
    private authenticationService: TokenStorageService,
    private http: HttpClient
  ) {}

  getWarehouses(Page: number, pageSize: number): Observable<any> {
    let { token } = this.authenticationService.getUser();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(
      `${API_URL}/GetWarehouses?page=${Page}&pageSize=${pageSize}`,
      { headers: headers }
    );
  }
  getItems(Page: number, pageSize: number, id: string | null): Observable<any> {
    let { token } = this.authenticationService.getUser();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(
      `${API_URL}/GetItems?page=${Page}&pageSize=${pageSize}&wherhouseId=${id}`,
      { headers: headers }
    );
  }
  getWarehouse(id: string): Observable<any> {
    let { token } = this.authenticationService.getUser();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(`${API_URL}/GetWarehouse?warehouseId=${id}`, {
      headers: headers,
    });
  }
  getItem(id: string): Observable<any> {
    let { token } = this.authenticationService.getUser();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(`${API_URL}/GetItem?itemId=${id}`, {
      headers: headers,
    });
  }
  addWarehouse(warehouse: any): Observable<any> {
    let { token } = this.authenticationService.getUser();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(`${API_URL}/Add`, warehouse, {
      headers: headers,
    });
  }
  addItem(item: any): Observable<any> {
    let { token } = this.authenticationService.getUser();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(`${API_URL}/item/add`, item, {
      headers: headers,
    });
  }
  deletewarehouse(warehouseId: string): Observable<any> {
    let { token } = this.authenticationService.getUser();
    let data = new FormData();
    data.append('warehouseId', warehouseId);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(`${API_URL}/Delete`, data, {
      headers: headers,
    });
  }
  deleteItem(itemId: string): Observable<any> {
    let { token } = this.authenticationService.getUser();
    let data = new FormData();
    data.append('itemId', itemId);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(`${API_URL}/Item/Delete`, data, {
      headers: headers,
    });
  }
}
