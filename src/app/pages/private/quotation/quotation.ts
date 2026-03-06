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
      q.project_type?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
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
    this.quotesService.getAll().subscribe({
      next: (res) => {
        this.activeQuotes = Array.isArray(res.projectTypes) ? res.projectTypes : (res.projectTypes ? [res.projectTypes] : []);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar las cotizaciones';
        this.loading = false;
      },
    });
  }

  onRespond(quote: Quote): void {
    // Lógica para responder (podría abrir un modal o navegar)
    console.log('Respondiendo a:', quote);
  }

  onReject(quote: Quote): void {
    if (quote._id) {
      this.quotesService.delete(quote._id).subscribe({
        next: () => {
          this.activeQuotes = this.activeQuotes.filter((q) => q._id !== quote._id);
        },
        error: () => {
          alert('No se pudo rechazar la cotización');
        },
      });
    }
  }
}
