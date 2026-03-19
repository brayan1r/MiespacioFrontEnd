import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '../../../shared/children/header/header';
import { Footer } from '../../../shared/children/footer/footer';
import { ServicesService } from '../../../services/services.service';

import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [CommonModule, Header, Footer, RouterModule],
  templateUrl: './services-page.html',
  styleUrl: './services-page.scss',
})
export class ServicesPage implements OnInit {
  services: any[] = [];
  loading = true;

  staticServices = [
    {
      title: 'Diseño Arquitectónico',
      description: 'Creación de planos conceptuales y técnicos para residencias, comercios e industrias.',
      icon: 'assets/icons/footer/maleta.png'
    },
    {
      title: 'Remodelaciones',
      description: 'Transformación integral de espacios existentes para mejorar su funcionalidad y estética.',
      icon: 'assets/icons/footer/insignia.png'
    },
    {
      title: 'Diseño de Interiores',
      description: 'Selección de acabados, mobiliario e iluminación para crear ambientes únicos.',
      icon: 'assets/icons/footer/grafico.png'
    },
    {
      title: 'Asesoría Técnica',
      description: 'Consultoría experta en normativas, materiales y viabilidad de proyectos.',
      icon: 'assets/icons/footer/cliente.png'
    },
    {
      title: 'Gestión de Proyectos',
      description: 'Supervisión integral de la obra para garantizar plazos y presupuestos.',
      icon: 'assets/icons/footer/maleta.png'
    },
    {
      title: 'Renderizado 3D',
      description: 'Visualizaciones fotorealistas de alta calidad para previsualizar tu proyecto.',
      icon: 'assets/icons/footer/grafico.png'
    }
  ];

  constructor(private servicesService: ServicesService) { }

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices(): void {
    this.servicesService.getAllServices().subscribe({
      next: (data) => {
        // Mapeamos los servicios del backend para asegurar tener iconos con rutas de imagen válidas
        const mappedData = data.map(s => ({
            ...s,
            icon: s.icon && s.icon.includes('/') ? s.icon : 'assets/icons/footer/maleta.png'
        }));
        this.services = mappedData.length > 0 ? mappedData : this.staticServices;
        this.loading = false;
      },
      error: () => {
        this.services = this.staticServices;
        this.loading = false;
      }
    });
  }
}
