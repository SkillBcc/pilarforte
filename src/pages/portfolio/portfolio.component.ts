
import { Component, signal, WritableSignal, computed, OnDestroy } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

interface ProjectItem {
  id: number;
  title: string;
  location: string;
  category: string;
  coverImage: string;
  gallery: string[];
}

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent implements OnDestroy {
  // State for the Lightbox
  selectedProject: WritableSignal<ProjectItem | null> = signal(null);
  currentImageIndex: WritableSignal<number> = signal(0);

  // Derived state for the current image URL
  currentImageUrl = computed(() => {
    const project = this.selectedProject();
    const index = this.currentImageIndex();
    return project ? project.gallery[index] : '';
  });

  projects: ProjectItem[] = [
    {
      id: 1,
      title: 'Villa Moderna',
      location: 'Cascais',
      category: 'Construção Nova',
      coverImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&h=600&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&h=900&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&h=900&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&h=900&auto=format&fit=crop'
      ]
    },
    {
      id: 2,
      title: 'Apartamento Pombalino',
      location: 'Chiado, Lisboa',
      category: 'Remodelação',
      coverImage: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?q=80&w=800&h=600&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?q=80&w=1200&h=900&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1200&h=900&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&h=900&auto=format&fit=crop',
      ]
    },
    {
      id: 3,
      title: 'Escritórios Corporativos',
      location: 'Parque das Nações',
      category: 'Comercial',
      coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&h=600&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&h=900&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1200&h=900&auto=format&fit=crop',
      ]
    },
    {
      id: 4,
      title: 'Moradia T4',
      location: 'Sintra',
      category: 'Construção Nova',
      coverImage: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=800&h=600&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1200&h=900&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1200&h=900&auto=format&fit=crop',
      ]
    },
    {
      id: 5,
      title: 'Loft Industrial',
      location: 'Marvila',
      category: 'Reabilitação',
      coverImage: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=800&h=600&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=1200&h=900&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=80&w=1200&h=900&auto=format&fit=crop',
      ]
    },
    {
      id: 6,
      title: 'Restaurante Minimalista',
      location: 'Santos, Lisboa',
      category: 'Comercial',
      coverImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&h=600&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&h=900&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1200&h=900&auto=format&fit=crop',
      ]
    }
  ];

  ngOnDestroy() {
    // Ensure scroll is restored even if component is destroyed while lightbox is open
    document.body.style.overflow = 'auto';
  }

  openProject(project: ProjectItem) {
    this.selectedProject.set(project);
    this.currentImageIndex.set(0);
    // Prevent background scrolling
    document.body.style.overflow = 'hidden';
  }

  closeProject() {
    this.selectedProject.set(null);
    // Restore background scrolling
    document.body.style.overflow = 'auto';
  }

  nextImage(event?: Event) {
    event?.stopPropagation();
    const project = this.selectedProject();
    if (project) {
      this.currentImageIndex.update(idx => 
        idx === project.gallery.length - 1 ? 0 : idx + 1
      );
    }
  }

  prevImage(event?: Event) {
    event?.stopPropagation();
    const project = this.selectedProject();
    if (project) {
      this.currentImageIndex.update(idx => 
        idx === 0 ? project.gallery.length - 1 : idx - 1
      );
    }
  }

  setImage(index: number, event?: Event) {
    event?.stopPropagation();
    this.currentImageIndex.set(index);
  }
}
