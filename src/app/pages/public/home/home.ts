import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Header } from '../../../shared/children/header/header';
import { WorksService } from '../../../services/works.service';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [RouterLink, CommonModule, Header],
    templateUrl: './home.html',
    styleUrl: './home.scss',
})
export class Home implements OnInit {
    stats = [
        { label: 'Proyectos Completados', value: '200+', icon: 'assets/icons/home/projects.png' },
        { label: 'Clientes Satisfechos', value: '150+', icon: 'assets/icons/home/clients.png' },
        { label: 'Premios Ganados', value: '25+', icon: 'assets/icons/home/awards.png' },
    ];

    featuredProjects: any[] = [];

    constructor(private worksService: WorksService) {}

    ngOnInit(): void {
        this.worksService.getPublicWorks().subscribe({
            next: (works: any[]) => {
                // Mapear los datos de works para que coincidan con la estructura que espera la vista
                this.featuredProjects = works.slice(0, 3).map(w => ({
                    title: w.title,
                    category: w.category.toUpperCase(),
                    image: w.cover?.url || 'assets/images/residencia.jpg'
                }));
            },
            error: (err) => {
                console.error('Error fetching featured projects', err);
            }
        });
    }
}
