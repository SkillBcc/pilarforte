
import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  featuredServices = [
    {
      title: 'Construção de Raiz',
      description: 'Do projeto à chave na mão, edificamos a sua visão com rigor técnico e materiais de excelência.',
      link: '/servicos/construcao-raiz',
      image: 'https://picsum.photos/id/128/600/400'
    },
    {
      title: 'Remodelação & Reabilitação',
      description: 'Renovação integral de interiores e recuperação de edifícios, respeitando a traça original.',
      link: '/servicos/remodelacao',
      image: 'https://picsum.photos/id/203/600/400'
    },
    {
      title: 'Projetos de Engenharia',
      description: 'Cálculos estruturais, especialidades e gestão de obra para garantir a máxima segurança.',
      link: '/servicos/engenharia',
      image: 'https://picsum.photos/id/609/600/400'
    }
  ];

  featuredProjects = [
    {
      title: 'Villa Moderna',
      location: 'Cascais',
      image: 'https://picsum.photos/id/122/800/600'
    },
    {
      title: 'Apartamento Pombalino',
      location: 'Lisboa (Chiado)',
      image: 'https://picsum.photos/id/188/800/600'
    },
    {
      title: 'Escritórios Corporativos',
      location: 'Parque das Nações',
      image: 'https://picsum.photos/id/24/800/600'
    }
  ];
}
