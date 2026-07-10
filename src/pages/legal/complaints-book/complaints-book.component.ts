
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../../services/seo.service';

@Component({
  selector: 'app-complaints-book',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './complaints-book.component.html',
  styleUrl: './complaints-book.component.css'
})
export class ComplaintsBookComponent implements OnInit {
  constructor(private seoService: SeoService) {}

  ngOnInit() {
    this.seoService.setMetaTags(
      'Livro de Reclamações Eletrónico | Pilar Forte',
      'Aceda ao Livro de Reclamações Eletrónico da Pilar Forte. Espaço dedicado para submeter exposições ou reclamações de forma oficial.'
    );
    this.seoService.setJsonLdDefault();
  }
}
