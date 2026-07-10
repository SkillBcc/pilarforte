
import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../../services/seo.service';

@Component({
  selector: 'app-engineering',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RouterLink],
  templateUrl: './engineering.component.html',
  styleUrl: './engineering.component.css'
})
export class EngineeringComponent implements OnInit {
  constructor(private seoService: SeoService) {}

  ngOnInit() {
    this.seoService.setMetaTags(
      'Projetos de Engenharia Civil e Fiscalização | Pilar Forte',
      'Soluções de engenharia civil, elaboração de projetos estruturais, coordenação e fiscalização técnica de obras em Lisboa e Setúbal.'
    );
    this.seoService.setJsonLdDefault();
  }
}
