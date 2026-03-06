import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '../../../shared/children/header/header';
import { Footer } from '../../../shared/children/footer/footer';

@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [CommonModule, Header, Footer],
  templateUrl: './services-page.html',
  styleUrl: './services-page.scss',
})
export class ServicesPage {
  services = [
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
}
