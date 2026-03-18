import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '../../../shared/children/header/header';
import { Footer } from '../../../shared/children/footer/footer';
import { WorksService } from '../../../services/works.service';

@Component({
  selector: 'app-ourjob',
  standalone: true,
  imports: [CommonModule, Header, Footer],
  templateUrl: './ourjob.html',
  styleUrl: './ourjob.scss',
})
export class Ourjob implements OnInit {
  categories = ['Todos', 'Residencial', 'Comercial', 'Remodelación', 'Interiores'];
  activeCategory = 'Todos';
  projects: any[] = [];
  loading = true;

  staticProjects = [
    { title: 'Villa del Sol', category: 'Residencial', image: 'assets/images/residencia.jpg' },
    { title: 'Centro Empresarial Norte', category: 'Comercial', image: 'assets/images/corporativo.jpg' },
    { title: 'Apartamento Loft Soho', category: 'Interiores', image: 'assets/images/minimalista.jpg' },
    { title: 'Reforma Casa Antigua', category: 'Remodelación', image: 'assets/images/about-blueprints.jpg' },
    { title: 'Casa del Lago', category: 'Residencial', image: 'assets/images/headerMiEspacio.jpeg' },
    { title: 'Restaurante Bistro', category: 'Comercial', image: 'assets/images/corporativo.jpg' },
  ];

  constructor(private worksService: WorksService) { }

  ngOnInit(): void {
    this.loadWorks();
  }

  loadWorks(): void {
    this.worksService.getPublicWorks().subscribe({
      next: (data) => {
        this.projects = data.length > 0 ? data : this.staticProjects;
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
