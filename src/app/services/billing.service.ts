import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BillingService {
  private readonly API_URL = `${environment.apiUrl}/billing`;

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAllBilling(): Observable<any[]> {
    return this.http.get<any[]>(this.API_URL, { headers: this.getHeaders() });
  }

  getBillingById(id: string): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/${id}`, { headers: this.getHeaders() });
  }

  createBilling(billing: any): Observable<any> {
    return this.http.post<any>(this.API_URL, billing, { headers: this.getHeaders() });
  }

  updateBilling(id: string, billing: any): Observable<any> {
    return this.http.patch<any>(`${this.API_URL}/${id}`, billing, { headers: this.getHeaders() });
  }

  deleteBilling(id: string): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/${id}`, { headers: this.getHeaders() });
  }
}
