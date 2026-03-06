import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-forgot-password',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule, RouterLink],
    templateUrl: './forgot-password.html',
    styleUrl: './forgot-password.scss',
})
export class ForgotPassword {
    forgotForm: FormGroup;
    message: string = '';
    errorMsg: string = '';
    loading: boolean = false;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        this.forgotForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
        });
    }

    onSubmit(): void {
        if (this.forgotForm.invalid) {
            return;
        }

        this.loading = true;
        this.errorMsg = '';
        this.message = '';

        this.authService.forgotPassword(this.forgotForm.value.email).subscribe({
            next: (res: any) => {
                this.loading = false;
                this.message = res.msg;
            },
            error: (err: any) => {
                this.loading = false;
                this.errorMsg = err.error?.msg || 'Error al procesar la solicitud';
            },
        });
    }
}
