import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '../../../shared/children/header/header';
import { Footer } from '../../../shared/children/footer/footer';
import { WorksService } from '../../../services/works.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, Header, Footer],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects implements OnInit {
  projects: any[] = [];
  loading = true;

  constructor(private worksService: WorksService) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.worksService.getPublicWorks().subscribe({
      next: (res: any) => {
        this.projects = res.works || res;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  getStats() {
    return {
      total: this.projects.length,
      published: this.projects.filter(p => p.isPublished).length,
      unpublished: this.projects.filter(p => !p.isPublished).length
    };
  }
}
