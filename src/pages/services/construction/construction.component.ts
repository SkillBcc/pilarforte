
import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../../services/seo.service';

@Component({
  selector: 'app-construction',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RouterLink],
  templateUrl: './construction.component.html',
  styleUrl: './construction.component.css'
})
export class ConstructionComponent implements OnInit {
  constructor(private seoService: SeoService) {}

  ngOnInit() {
    this.seoService.setMetaTags(
      'Construção de Raiz e Moradias | Pilar Forte',
      'Construímos a sua casa de sonho do zero. Serviços completos de construção de moradias, edifícios e obras de raiz em Lisboa e Setúbal com a máxima qualidade.'
    );
    this.seoService.setJsonLdDefault();
  }
}
