import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { AuthService } from './auth';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WorksService {
  private readonly API_URL = `${environment.apiUrl}/works`;

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Public - el backend devuelve { message, works: [...] }
  getPublicWorks(): Observable<any[]> {
    return this.http.get<any>(this.API_URL).pipe(
      map(res => res.works || res || [])
    );
  }

  getWorkById(id: string): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/${id}`).pipe(
      map(res => res.work || res)
    );
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
