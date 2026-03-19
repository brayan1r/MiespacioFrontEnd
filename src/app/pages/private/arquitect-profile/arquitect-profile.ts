import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '../../../shared/children/header/header';
import { Footer } from '../../../shared/children/footer/footer';
import { AuthService } from '../../../services/auth';
import { User } from '../../../services/auth.interface';

@Component({
  selector: 'app-arquitect-profile',
  standalone: true,
  imports: [CommonModule, Header, Footer],
  templateUrl: './arquitect-profile.html',
  styleUrl: './arquitect-profile.scss',
})
export class ArquitectProfile implements OnInit {
  user: User | null = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.getUser();
  }

  onLogout(): void {
    this.authService.logout();
    window.location.href = '/login';
  }
}
