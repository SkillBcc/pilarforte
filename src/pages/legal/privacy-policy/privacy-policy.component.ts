
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../../services/seo.service';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.css'
})
export class PrivacyPolicyComponent implements OnInit {
  constructor(private seoService: SeoService) {}

  ngOnInit() {
    this.seoService.setMetaTags(
      'Política de Privacidade | Pilar Forte',
      'Consulte a Política de Privacidade do website da Pilar Forte e saiba como recolhemos, tratamos e protegemos os seus dados pessoais.'
    );
    this.seoService.setJsonLdDefault();
  }
}
