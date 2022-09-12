import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../_services/token-storage.service';

const API_URL = 'https://localhost:7132/api/user';
const AUTH_API = 'https://localhost:7132/api/auth';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(
    private authenticationService: TokenStorageService,
    private http: HttpClient
  ) {}

  getUsers(Page: number, pageSize: number): Observable<any> {
    let { token } = this.authenticationService.getUser();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(
      `${API_URL}/GetUsers?page=${Page}&pageSize=${pageSize}`,
      { headers: headers }
    );
  }

  deleteUser(userId: string): Observable<any> {
    let { token } = this.authenticationService.getUser();
    let data = new FormData();
    data.append('userId', userId);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(`${API_URL}/DeleteUser`, data, {
      headers: headers,
    });
  }

  changePass(
    userId: string,
    currPass: string,
    newPass: string
  ): Observable<any> {
    let { token } = this.authenticationService.getUser();
    let data = new FormData();
    data.append('userId', userId);
    data.append('newPass', newPass);
    data.append('confPass', currPass);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(`${AUTH_API}/ChangePassword`, data, {
      headers: headers,
    });
  }

  getRoles(): Observable<any> {
    let { token } = this.authenticationService.getUser();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(`${API_URL}/GetRoles`, { headers: headers });
  }

  getUser(id: string): Observable<any> {
    let { token } = this.authenticationService.getUser();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(`${API_URL}/GetUser?userId=${id}`, {
      headers: headers,
    });
  }

  register(user: any): Observable<any> {
    let { token } = this.authenticationService.getUser();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(`${AUTH_API}/Register`, user, {
      headers: headers,
    });
  }
}
