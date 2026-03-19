import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { QuotesService } from '../../../services/quotes/quotes.service';
import { CommonModule } from '@angular/common';
import { Header } from '../../../shared/children/header/header';
import { Footer } from '../../../shared/children/footer/footer';
import { AuthService } from '../../../services/auth';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-quotation-public',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, Header, Footer, RouterLink],
  templateUrl: './quotation.html',
  styleUrl: './quotation.scss',
})
export class Quotation implements OnInit {
  quoteForm: FormGroup;
  loading: boolean = false;
  successMsg: string = '';
  errorMsg: string = '';
  isLoggedIn: boolean = false;

  projectTypes = ['Residencial', 'Comercial', 'Industrial', 'Remodelación', 'Interiores'];
  serviceTypes = [
    'Diseño Arquitectónico',
    'Remodelación Integral',
    'Diseño de Interiores',
    'Gestión de Proyectos',
    'Consultoría Especializada'
  ];
  timeRanges = ['1-3 meses', '3-6 meses', '6-12 meses', 'flexible'];
  contactMethods = [
    { value: 'email', label: 'Correo Electrónico' },
    { value: 'telefono', label: 'Teléfono / WhatsApp' }
  ];

  constructor(
    private fb: FormBuilder,
    private quotesService: QuotesService,
    private authService: AuthService,
    private router: Router
  ) {
    this.quoteForm = this.fb.group({
      projectType: ['', [Validators.required]],
      specificService: ['', [Validators.required]],
      estimatedBudget: ['', [Validators.required, Validators.min(1)]],
      estimatedTime: ['', [Validators.required]],
      location: ['', [Validators.required]],
      description: [''],
      preferredContactMethod: ['email'],
    });
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
  }

  onSubmit(): void {
    if (this.quoteForm.invalid) return;

    if (!this.isLoggedIn) {
      this.errorMsg = 'Debes iniciar sesión para enviar una cotización.';
      return;
    }

    this.loading = true;
    this.successMsg = '';
    this.errorMsg = '';

    this.quotesService.create(this.quoteForm.value).subscribe({
      next: (res) => {
        this.loading = false;
        this.successMsg = '¡Solicitud enviada con éxito! Nos pondremos en contacto pronto.';
        this.quoteForm.reset();
        this.quoteForm.patchValue({ preferredContactMethod: 'email' });
      },
      error: (err) => {
        this.loading = false;
        this.errorMsg = err.error?.message || 'Error al enviar la solicitud. Por favor, intenta de nuevo.';
      },
    });
  }
}
