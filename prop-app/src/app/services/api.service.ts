import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://your-api-endpoint.com/api';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  private getHeaders() {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    });
  }

  get(endpoint: string, params?: any) {
    return this.http.get(`${this.baseUrl}/${endpoint}`, {
      headers: this.getHeaders(),
      params
    });
  }

  post(endpoint: string, data: any) {
    return this.http.post(`${this.baseUrl}/${endpoint}`, data, {
      headers: this.getHeaders()
    });
  }

  put(endpoint: string, data: any) {
    return this.http.put(`${this.baseUrl}/${endpoint}`, data, {
      headers: this.getHeaders()
    });
  }

  delete(endpoint: string) {
    return this.http.delete(`${this.baseUrl}/${endpoint}`, {
      headers: this.getHeaders()
    });
  }
}