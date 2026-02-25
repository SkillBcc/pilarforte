
import { Injectable } from '@angular/core';

export interface ServiceItem {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  icon: string;
  image: string;
  link: string;
}

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private services: ServiceItem[] = [
    {
      id: 1,
      title: 'Construção de Raiz',
      description: 'Do projeto à chave na mão, edificamos a sua visão com rigor técnico e materiais de excelência.',
      longDescription: 'Executamos projetos de construção residencial e comercial, garantindo solidez estrutural e acabamentos de excelência desde as fundações até à chave na mão.',
      icon: 'construction',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=600&h=400&auto=format&fit=crop',
      link: '/servicos/construcao-raiz'
    },
    {
      id: 2,
      title: 'Remodelação & Reabilitação',
      description: 'Renovação integral de interiores e recuperação de edifícios, respeitando a traça original.',
      longDescription: 'Especialistas na renovação de apartamentos e reabilitação de edifícios antigos em Lisboa. Preservamos a traça original e o valor histórico.',
      icon: 'renovation',
      image: 'https://images.unsplash.com/photo-1574359411659-15573a27fd0c?q=80&w=600&h=400&auto=format&fit=crop',
      link: '/servicos/remodelacao'
    },
    {
      id: 3,
      title: 'Projetos de Engenharia',
      description: 'Cálculos estruturais, especialidades e gestão de obra para garantir a máxima segurança.',
      longDescription: 'Desenvolvimento de especialidades, cálculos estruturais e gestão de obra rigorosa. Conformidade total com todas as normas em vigor.',
      icon: 'engineering',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=600&h=400&auto=format&fit=crop',
      link: '/servicos/engenharia'
    },
    {
      id: 4,
      title: 'Arquitetura e Design',
      description: 'Parcerias com arquitetos de renome para criar espaços únicos. Focamo-nos na funcionalidade e na estética.',
      longDescription: 'Parcerias com arquitetos de renome para criar espaços únicos. Focamo-nos na funcionalidade e na estética.',
      icon: 'design',
      image: 'https://images.unsplash.com/photo-1512917774080-bca914877e0e?q=80&w=600&h=400&auto=format&fit=crop',
      link: '/servicos/arquitetura'
    }
  ];

  getServices(): ServiceItem[] {
    return this.services;
  }
}
