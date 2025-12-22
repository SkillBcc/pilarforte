
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface ServiceItem {
  id: number;
  title: string;
  description: string;
  icon: string;
  link: string;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {
  services: ServiceItem[] = [
    {
      id: 1,
      title: 'Construção de Raiz',
      description: 'Executamos projetos de construção residencial e comercial, garantindo solidez estrutural e acabamentos de excelência desde as fundações até à chave na mão.',
      icon: 'construction',
      link: '/servicos/construcao-raiz'
    },
    {
      id: 2,
      title: 'Remodelação e Reabilitação',
      description: 'Especialistas na renovação de apartamentos e reabilitação de edifícios antigos em Lisboa. Preservamos a traça original e o valor histórico.',
      icon: 'renovation',
      link: '/servicos/remodelacao'
    },
    {
      id: 3,
      title: 'Projetos de Engenharia',
      description: 'Desenvolvimento de especialidades, cálculos estruturais e gestão de obra rigorosa. Conformidade total com todas as normas em vigor.',
      icon: 'engineering',
      link: '/servicos/engenharia'
    },
    {
      id: 4,
      title: 'Arquitetura e Design',
      description: 'Parcerias com arquitetos de renome para criar espaços únicos. Focamo-nos na funcionalidade e na estética.',
      icon: 'design',
      link: '/servicos/arquitetura'
    }
  ];
}
