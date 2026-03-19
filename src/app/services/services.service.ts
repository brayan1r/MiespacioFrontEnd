import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { AuthService } from './auth';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  private readonly API_URL = `${environment.apiUrl}/services`;

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAllServices(): Observable<any[]> {
    return this.http.get<any>(this.API_URL).pipe(
      map(res => res.allServices || res || [])
    );
  }

  getServiceById(id: string): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/${id}`).pipe(
      map(res => res.service || res)
    );
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
