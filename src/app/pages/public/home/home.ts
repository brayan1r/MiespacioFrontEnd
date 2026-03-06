import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Header } from '../../../shared/children/header/header';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [RouterLink, CommonModule, Header],
    templateUrl: './home.html',
    styleUrl: './home.scss',
})
export class Home {
    stats = [
        { label: 'Proyectos Completados', value: '200+', icon: 'assets/icons/home/projects.png' },
        { label: 'Clientes Satisfechos', value: '150+', icon: 'assets/icons/home/clients.png' },
        { label: 'Premios Ganados', value: '25+', icon: 'assets/icons/home/awards.png' },
    ];

    featuredProjects = [
        {
            title: 'Residencia Moderna',
            type: 'RESIDENCIAL',
            image: 'assets/images/residencia.jpg',
        },
        {
            title: 'Edificio Corporativo',
            type: 'COMERCIAL',
            image: 'assets/images/corporativo.jpg',
        },
        {
            title: 'Casa Minimalista',
            type: 'RESIDENCIAL',
            image: 'assets/images/minimalista.jpg',
        },
    ];
}
