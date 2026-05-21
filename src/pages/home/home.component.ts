
import { Component, ElementRef, AfterViewInit, OnDestroy, Inject, PLATFORM_ID, signal, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PortfolioService, ProjectItem } from '../../services/portfolio.service';
import { ServicesService, ServiceItem } from '../../services/services.service';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  
  private observer: IntersectionObserver | undefined;
  private carouselInterval: any;

  // Hero Carousel State
  currentHeroIndex = signal(0);
  
  // Lista de imagens para o slideshow (Estilo: Construção/Engenharia Sóbrio)
  heroImages: string[] = [
    // 3. Engenheiros a apontar/discutir em obra
    'https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?q=80&w=1920&auto=format&fit=crop',
    // 2. Estrutura em betão e gruas (Atmosfera construção pesada)
    'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1920&auto=format&fit=crop',
    // 1. Original (Engenheiros com planos)
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1920&auto=format&fit=crop',
    // 4. Detalhe arquitetónico/Fachada em construção
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1920&auto=format&fit=crop',
    // 5. Trabalhador/Capacete e foco técnico
    'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1920&auto=format&fit=crop'
  ];

  featuredServices: ServiceItem[] = [];
  featuredProjects: ProjectItem[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private el: ElementRef,
    private portfolioService: PortfolioService,
    private servicesService: ServicesService,
    private seoService: SeoService
  ) {
    this.featuredProjects = this.portfolioService.getProjects().slice(0, 3);
    
    // Create a shuffled copy of the services array for the home page
    const allServices = this.servicesService.getServices();
    const shuffledServices = this.shuffleArray([...allServices]);
    this.featuredServices = shuffledServices.slice(0, 3);

    this.seoService.setMetaTags(
      'Pilar Forte | Construção e Remodelações em Lisboa e Setúbal',
      'Especialistas em construção civil, engenharia e remodelações de luxo. Atuamos em toda a região de Lisboa e Setúbal com rigor e qualidade.'
    );
    this.seoService.setJsonLdDefault();
  }

  private shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.startHeroCarousel();
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.setupIntersectionObserver();
    }
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
    }
  }

  private startHeroCarousel() {
    // Muda a imagem a cada 10 segundos (10000ms)
    this.carouselInterval = setInterval(() => {
      this.currentHeroIndex.update(index => (index + 1) % this.heroImages.length);
    }, 10000);
  }

  private setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1 // Trigger animation when 10% of the element is visible
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Optional: Unobserve after animating once for better performance
          this.observer?.unobserve(entry.target);
        }
      });
    }, options);

    // Select all elements with the 'reveal-on-scroll' class within this component
    const elements = this.el.nativeElement.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el: Element) => {
      this.observer?.observe(el);
    });
  }
}
