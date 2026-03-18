import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root',
})
export class WorksService {
  private readonly API_URL = 'http://localhost:3000/api/v1/works';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Public
  getPublicWorks(): Observable<any[]> {
    return this.http.get<any[]>(this.API_URL);
  }

  getWorkById(id: string): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/${id}`);
  }

  // Admin
  createWork(work: any): Observable<any> {
    return this.http.post<any>(this.API_URL, work, { headers: this.getHeaders() });
  }

  updateWork(id: string, work: any): Observable<any> {
    return this.http.patch<any>(`${this.API_URL}/${id}`, work, { headers: this.getHeaders() });
  }

  deleteWork(id: string): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/${id}`, { headers: this.getHeaders() });
  }
}
