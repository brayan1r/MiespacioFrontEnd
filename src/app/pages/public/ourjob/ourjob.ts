import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '../../../shared/children/header/header';
import { Footer } from '../../../shared/children/footer/footer';

@Component({
  selector: 'app-ourjob',
  standalone: true,
  imports: [CommonModule, Header, Footer],
  templateUrl: './ourjob.html',
  styleUrl: './ourjob.scss',
})
export class Ourjob {
  categories = ['Todos', 'Residencial', 'Comercial', 'Remodelación', 'Interiores'];
  activeCategory = 'Todos';

  projects = [
    { title: 'Villa del Sol', category: 'Residencial', image: 'assets/images/residencia.jpg' },
    { title: 'Centro Empresarial Norte', category: 'Comercial', image: 'assets/images/corporativo.jpg' },
    { title: 'Apartamento Loft Soho', category: 'Interiores', image: 'assets/images/minimalista.jpg' },
    { title: 'Reforma Casa Antigua', category: 'Remodelación', image: 'assets/images/about-blueprints.jpg' },
    { title: 'Casa del Lago', category: 'Residencial', image: 'assets/images/headerMiEspacio.jpeg' },
    { title: 'Restaurante Bistro', category: 'Comercial', image: 'assets/images/corporativo.jpg' },
  ];

  get filteredProjects() {
    return this.activeCategory === 'Todos'
      ? this.projects
      : this.projects.filter(p => p.category === this.activeCategory);
  }

  setCategory(cat: string) {
    this.activeCategory = cat;
  }
}
