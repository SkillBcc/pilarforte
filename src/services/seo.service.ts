
import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';

const DEFAULT_META_TAGS = {
  title: 'Pilar Forte | Construção e Remodelações em Lisboa e Setúbal',
  description: 'A Pilar Forte é uma empresa de construção civil e engenharia especializada em obras, remodelações de luxo e projetos de arquitetura em Lisboa e Setúbal. Qualidade e rigor em cada detalhe.'
};

const DEFAULT_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Pilar Forte',
  telephone: '+351 960 139 063',
  email: 'geral@flexsolutions.pt',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Lisboa',
    addressCountry: 'PT'
  },
  'areaServed': [
    'Lisboa',
    'Setúbal',
    'Alenquer', 
    'Amadora', 
    'Arruda dos Vinhos', 
    'Azambuja', 
    'Cadaval', 
    'Cascais', 
    'Loures', 
    'Lourinhã', 
    'Mafra', 
    'Odivelas', 
    'Oeiras', 
    'Sintra', 
    'Sobral de Monte Agraço', 
    'Torres Vedras', 
    'Vila Franca de Xira',
    'Montijo',
    'Barreiro',
    'Seixal'
  ],
  'keywords': 'Construção civil lisboa, Construção civil setúbal, Obras, Acabamentos, Arquitetura, Engenharia Civil, Remodelação'
};

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    private titleService: Title,
    private meta: Meta
  ) { }

  setMetaTagsDefault() {
    this.setMetaTags(DEFAULT_META_TAGS.title, DEFAULT_META_TAGS.description);
  };

  setMetaTags(title: string, description: string, image: string = 'assets/icons/icon-512x512.png') {
    this.titleService.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    
    // Open Graph / Facebook
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:type', content: 'website' });

    // Canonical Link
    this.updateCanonicalLink();
  }

  private updateCanonicalLink() {
    let link: HTMLLinkElement | null = this.doc.querySelector('link[rel="canonical"]');
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', this.doc.URL);
  }

  setJsonLdDefault(): void {
    this.setJsonLd(DEFAULT_JSON_LD);
  };

  setJsonLd(schema: any): void {
    let script = this.doc.querySelector('script[type="application/ld+json"]');
    if (script) {
      script.textContent = JSON.stringify(schema);
    } else {
      script = this.doc.createElement('script');
      // script.type = 'application/ld+json';
      script.textContent = JSON.stringify(schema);
      this.doc.head.appendChild(script);
    }
  }
}
