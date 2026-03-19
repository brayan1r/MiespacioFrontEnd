import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quote, QuoteResponse, QuoteDeleteResponse } from './quote.interface';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class QuotesService {
    private readonly API_URL = `${environment.apiUrl}/quotes`;

    constructor(private http: HttpClient) { }

    private getHeaders(): HttpHeaders {
        const token = localStorage.getItem('token') || '';
        return new HttpHeaders({
            'Authorization': `Bearer ${token}`,
        });
    }

    getAll(): Observable<QuoteResponse> {
        return this.http.get<QuoteResponse>(this.API_URL, {
            headers: this.getHeaders(),
        });
    }

    create(quote: Quote): Observable<QuoteResponse> {
        return this.http.post<QuoteResponse>(this.API_URL, quote, {
            headers: this.getHeaders(),
        });
    }

    update(id: string, quote: Partial<Quote>): Observable<QuoteResponse> {
        return this.http.patch<QuoteResponse>(`${this.API_URL}/${id}`, quote, {
            headers: this.getHeaders(),
        });
    }

    delete(id: string): Observable<QuoteDeleteResponse> {
        return this.http.delete<QuoteDeleteResponse>(`${this.API_URL}/${id}`, {
            headers: this.getHeaders(),
        });
    }
}
