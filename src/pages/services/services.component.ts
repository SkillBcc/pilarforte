
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ServicesService, ServiceItem } from '../../services/services.service';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent implements OnInit {
  services: ServiceItem[] = [];

  constructor(private servicesService: ServicesService, private seoService: SeoService) {
    this.services = this.servicesService.getServices();
  }

  ngOnInit() {
    this.seoService.setMetaTags(
      'Serviços de Engenharia e Construção | Pilar Forte',
      'Conheça os nossos serviços integrados de construção de raiz, remodelações de interiores e exteriores, engenharia civil e projetos de arquitetura em Lisboa e Setúbal.'
    );
    this.seoService.setJsonLdDefault();
  }
}
