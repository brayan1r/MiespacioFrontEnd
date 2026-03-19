import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '../../../shared/children/header/header';
import { Footer } from '../../../shared/children/footer/footer';
import { WorksService } from '../../../services/works.service';

import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ourjob',
  standalone: true,
  imports: [CommonModule, Header, Footer, RouterModule],
  templateUrl: './ourjob.html',
  styleUrl: './ourjob.scss',
})
export class Ourjob implements OnInit {
  categories = ['Todos', 'Residencial', 'Comercial', 'Remodelación', 'Interiores'];
  activeCategory = 'Todos';
  projects: any[] = [];
  loading = true;

  staticProjects = [
    { title: 'Villa del Sol', category: 'Residencial', image: 'assets/images/residencia.jpg', year: 2023, areaM2: 350, location: 'Bogotá' },
    { title: 'Centro Empresarial Norte', category: 'Comercial', image: 'assets/images/corporativo.jpg', year: 2022, areaM2: 1200, location: 'Medellín' },
    { title: 'Apartamento Loft Soho', category: 'Interiores', image: 'assets/images/minimalista.jpg', year: 2024, areaM2: 120, location: 'Cali' },
    { title: 'Reforma Casa Antigua', category: 'Remodelación', image: 'assets/images/about-blueprints.jpg', year: 2021, areaM2: 210, location: 'Bogotá' },
    { title: 'Casa del Lago', category: 'Residencial', image: 'assets/images/headerMiEspacio.jpeg', year: 2023, areaM2: 450, location: 'Guatapé' },
    { title: 'Restaurante Bistro', category: 'Comercial', image: 'assets/images/corporativo.jpg', year: 2024, areaM2: 280, location: 'Cartagena' },
  ];

  constructor(private worksService: WorksService) { }

  ngOnInit(): void {
    this.loadWorks();
  }

  loadWorks(): void {
    this.worksService.getPublicWorks().subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          const catMap: { [key: string]: string } = {
            'residencial': 'Residencial',
            'comercial': 'Comercial',
            'remodelacion': 'Remodelación',
            'interiores': 'Interiores'
          };
          
          this.projects = data.map(w => ({
            title: w.title,
            category: catMap[w.category] || w.category,
            image: w.cover?.url || 'assets/images/residencia.jpg',
            year: w.year || 2024,
            areaM2: w.areaM2 || 100,
            location: w.location?.city || 'Colombia'
          }));
        } else {
          this.projects = this.staticProjects;
        }
        this.loading = false;
      },
      error: () => {
        this.projects = this.staticProjects;
        this.loading = false;
      }
    });
  }

  get filteredProjects() {
    return this.activeCategory === 'Todos'
      ? this.projects
      : this.projects.filter(p => p.category === this.activeCategory);
  }

  setCategory(cat: string) {
    this.activeCategory = cat;
  }
}
