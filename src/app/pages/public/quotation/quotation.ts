import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { QuotesService } from '../../../services/quotes/quotes.service';
import { Quote } from '../../../services/quotes/quote.interface';
import { CommonModule } from '@angular/common';
import { Header } from '../../../shared/children/header/header';
import { Footer } from '../../../shared/children/footer/footer';

@Component({
  selector: 'app-quotation-public',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, Header, Footer],
  templateUrl: './quotation.html',
  styleUrl: './quotation.scss',
})
export class Quotation {
  quoteForm: FormGroup;
  loading: boolean = false;
  successMsg: string = '';
  errorMsg: string = '';

  projectTypes = ['Residencial', 'Comercial', 'Industrial', 'Remodelación'];
  timeRanges = ['1-3 meses', '3-6 meses', '6-12 meses', 'flexible'];

  constructor(private fb: FormBuilder, private quotesService: QuotesService) {
    this.quoteForm = this.fb.group({
      estimatedBudget: ['', [Validators.required, Validators.min(0)]],
      estimatedTime: ['', [Validators.required]],
      project_type: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.quoteForm.invalid) {
      return;
    }

    this.loading = true;
    this.successMsg = '';
    this.errorMsg = '';

    const newQuote: Quote = this.quoteForm.value;

    this.quotesService.create(newQuote).subscribe({
      next: (res) => {
        this.loading = false;
        this.successMsg = '¡Solicitud enviada con éxito! Nos pondremos en contacto pronto.';
        this.quoteForm.reset();
      },
      error: (err) => {
        this.loading = false;
        this.errorMsg = 'Error al enviar la solicitud. Por favor, intenta de nuevo.';
      },
    });
  }
}
