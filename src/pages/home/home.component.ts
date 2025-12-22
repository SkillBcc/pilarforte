
import { Component, ElementRef, AfterViewInit, OnDestroy, Inject, PLATFORM_ID, signal, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

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
    // 1. Original (Engenheiros com planos)
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1920&auto=format&fit=crop',
    // 2. Estrutura em betão e gruas (Atmosfera construção pesada)
    'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1920&auto=format&fit=crop',
    // 3. Engenheiros a apontar/discutir em obra
    'https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?q=80&w=1920&auto=format&fit=crop',
    // 4. Detalhe arquitetónico/Fachada em construção
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1920&auto=format&fit=crop',
    // 5. Trabalhador/Capacete e foco técnico
    'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1920&auto=format&fit=crop'
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private el: ElementRef) {}

  featuredServices = [
    {
      title: 'Construção de Raiz',
      description: 'Do projeto à chave na mão, edificamos a sua visão com rigor técnico e materiais de excelência.',
      link: '/servicos/construcao-raiz',
      image: 'https://picsum.photos/id/128/600/400'
    },
    {
      title: 'Remodelação & Reabilitação',
      description: 'Renovação integral de interiores e recuperação de edifícios, respeitando a traça original.',
      link: '/servicos/remodelacao',
      image: 'https://picsum.photos/id/203/600/400'
    },
    {
      title: 'Projetos de Engenharia',
      description: 'Cálculos estruturais, especialidades e gestão de obra para garantir a máxima segurança.',
      link: '/servicos/engenharia',
      image: 'https://picsum.photos/id/609/600/400'
    }
  ];

  featuredProjects = [
    {
      title: 'Villa Moderna',
      location: 'Cascais',
      image: 'https://picsum.photos/id/122/800/600'
    },
    {
      title: 'Apartamento Pombalino',
      location: 'Lisboa (Chiado)',
      image: 'https://picsum.photos/id/188/800/600'
    },
    {
      title: 'Escritórios Corporativos',
      location: 'Parque das Nações',
      image: 'https://picsum.photos/id/24/800/600'
    }
  ];

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
