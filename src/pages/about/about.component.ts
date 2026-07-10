
import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {

  constructor(private seoService: SeoService) {}

  ngOnInit() {
    this.seoService.setMetaTags(
      'Quem Somos | Pilar Forte | Engenharia & Construção',
      'Saiba mais sobre a Pilar Forte, uma empresa com anos de experiência em engenharia, arquitetura e construção civil em Lisboa e Setúbal. Conheça a nossa história, valores e compromisso com a qualidade.'
    );
    this.seoService.setJsonLdDefault();
  }
}
