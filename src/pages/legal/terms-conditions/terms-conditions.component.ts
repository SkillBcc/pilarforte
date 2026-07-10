
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../../services/seo.service';

@Component({
  selector: 'app-terms-conditions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './terms-conditions.component.html',
  styleUrl: './terms-conditions.component.css'
})
export class TermsConditionsComponent implements OnInit {
  constructor(private seoService: SeoService) {}

  ngOnInit() {
    this.seoService.setMetaTags(
      'Termos e Condições | Pilar Forte',
      'Leia os Termos e Condições de utilização do website oficial da Pilar Forte Engenharia & Construção.'
    );
    this.seoService.setJsonLdDefault();
  }
}
