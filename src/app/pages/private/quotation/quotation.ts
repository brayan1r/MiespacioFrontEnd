import { Component, OnInit } from '@angular/core';
import { Header } from '../../../shared/children/header/header';
import { Footer } from '../../../shared/children/footer/footer';
import { QuotesService } from '../../../services/quotes/quotes.service';
import { Quote } from '../../../services/quotes/quote.interface';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quotation',
  standalone: true,
  imports: [Header, Footer, CommonModule, FormsModule],
  providers: [CurrencyPipe],
  templateUrl: './quotation.html',
  styleUrl: './quotation.scss',
})
export class Quotation implements OnInit {
  activeQuotes: Quote[] = [];
  searchTerm: string = '';
  loading: boolean = false;
  error: string = '';

  get filteredQuotes() {
    return this.activeQuotes.filter(q =>
      q.projectType?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      q.estimatedTime?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  get stats() {
    return {
      total: this.activeQuotes.length,
      highBudget: this.activeQuotes.filter(q => q.estimatedBudget > 50000).length,
      urgent: this.activeQuotes.filter(q => q.estimatedTime === '1-3 meses').length
    };
  }

  constructor(private quotesService: QuotesService) { }

  ngOnInit(): void {
    this.loadQuotes();
  }

  loadQuotes(): void {
    this.loading = true;
    this.error = '';
    this.quotesService.getAll().subscribe({
      next: (res: any) => {
        // Adaptamos segun la estructura real del backend
        this.activeQuotes = res.quotes || (Array.isArray(res) ? res : []);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'No se pudieron cargar las cotizaciones. Verifica tu conexión.';
        this.loading = false;
      },
    });
  }

  onRespond(quote: Quote): void {
    const email = 'info@miespacio.com';
    window.location.href = `mailto:${email}?subject=Respuesta a Cotización: ${quote.projectType}&body=Hola, hemos recibido tu solicitud de presupuesto...`;
  }

  onReject(quote: Quote): void {
    if (quote._id && confirm('¿Estás seguro de que deseas archivar esta cotización?')) {
      this.quotesService.delete(quote._id).subscribe({
        next: () => {
          this.activeQuotes = this.activeQuotes.filter((q) => q._id !== quote._id);
        },
        error: () => {
          alert('Hubo un error al intentar archivar la cotización.');
        },
      });
    }
  }
}
