import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth';
import { CommonModule } from '@angular/common';
import { AuthResponse } from '../../../services/auth.interface';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  registerForm: FormGroup;
  errorMsg: string = '';
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      cellphoneNumber: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.errorMsg = '';

    this.authService.register(this.registerForm.value).subscribe({
      next: (res: any) => {
        this.loading = false;
        if (res.msg && res.msg.includes('ERROR') || res.message && res.message.includes('ERROR')) {
          this.errorMsg = res.msg || res.message;
        } else {
          this.router.navigate(['/login']);
        }
      },
      error: (err: any) => {
        this.loading = false;
        // El backend responde con "message" en su middleware de errores y en sus controladores
        this.errorMsg = err.error?.message || err.error?.msg || 'Error al registrarse';
      },
    });
  }
}
