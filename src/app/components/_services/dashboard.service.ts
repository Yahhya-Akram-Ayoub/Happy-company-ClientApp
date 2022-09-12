import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../_services/token-storage.service';

const API_URL = 'https://localhost:7132/api/admin';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
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
      `${API_URL}/Warehouses/Get?page=${Page}&pageSize=${pageSize}`,
      { headers: headers }
    );
  }

  getItems(Page: number, pageSize: number, Asc: boolean): Observable<any> {
    let { token } = this.authenticationService.getUser();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(
      `${API_URL}/Items/Get?page=${Page}&pageSize=${pageSize}&Asc=${
        Asc ? 1 : 0
      }`,
      { headers: headers }
    );
  }

  getLogs(Page: number, pageSize: number): Observable<any> {
    let { token } = this.authenticationService.getUser();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(
      `${API_URL}/ReadLogs?page=${Page}&pageSize=${pageSize}`,
      { headers: headers }
    );
  }
}
