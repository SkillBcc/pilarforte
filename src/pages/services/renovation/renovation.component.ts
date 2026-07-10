
import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../../services/seo.service';

@Component({
  selector: 'app-renovation',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RouterLink],
  templateUrl: './renovation.component.html',
  styleUrl: './renovation.component.css'
})
export class RenovationComponent implements OnInit {
  constructor(private seoService: SeoService) {}

  ngOnInit() {
    this.seoService.setMetaTags(
      'Remodelações de Interiores e Luxo | Pilar Forte',
      'Renove o seu espaço com requinte e qualidade. Projetos completos de remodelação de moradias, apartamentos e escritórios em Lisboa e Setúbal.'
    );
    this.seoService.setJsonLdDefault();
  }
}
