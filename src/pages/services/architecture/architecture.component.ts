
import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../../services/seo.service';

@Component({
  selector: 'app-architecture',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RouterLink],
  templateUrl: './architecture.component.html',
  styleUrl: './architecture.component.css'
})
export class ArchitectureComponent implements OnInit {
  constructor(private seoService: SeoService) {}

  ngOnInit() {
    this.seoService.setMetaTags(
      'Projetos de Arquitetura e Design | Pilar Forte',
      'Criação de projetos de arquitetura modernos, funcionais e personalizados. Licenciamentos, design de interiores e estudos de viabilidade em Lisboa e Setúbal.'
    );
    this.seoService.setJsonLdDefault();
  }
}
