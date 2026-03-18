import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  private readonly API_URL = 'http://localhost:3000/api/v1/services';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAllServices(): Observable<any[]> {
    return this.http.get<any[]>(this.API_URL);
  }

  getServiceById(id: string): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/${id}`);
  }

  // Admin
  createService(service: any): Observable<any> {
    return this.http.post<any>(this.API_URL, service, { headers: this.getHeaders() });
  }

  updateService(id: string, service: any): Observable<any> {
    return this.http.patch<any>(`${this.API_URL}/${id}`, service, { headers: this.getHeaders() });
  }

  deleteService(id: string): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/${id}`, { headers: this.getHeaders() });
  }
}
