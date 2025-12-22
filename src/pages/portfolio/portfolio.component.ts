
import { Component, signal, WritableSignal, computed } from '@angular/core';
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
export class PortfolioComponent {
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
      coverImage: 'https://picsum.photos/id/122/800/600',
      gallery: [
        'https://picsum.photos/id/122/1200/800',
        'https://picsum.photos/id/123/1200/800',
        'https://picsum.photos/id/124/1200/800',
        'https://picsum.photos/id/125/1200/800'
      ]
    },
    {
      id: 2,
      title: 'Apartamento Pombalino',
      location: 'Chiado, Lisboa',
      category: 'Remodelação',
      coverImage: 'https://picsum.photos/id/188/800/600',
      gallery: [
        'https://picsum.photos/id/188/1200/800',
        'https://picsum.photos/id/189/1200/800',
        'https://picsum.photos/id/190/1200/800',
        'https://picsum.photos/id/191/1200/800'
      ]
    },
    {
      id: 3,
      title: 'Escritórios Corporativos',
      location: 'Parque das Nações',
      category: 'Comercial',
      coverImage: 'https://picsum.photos/id/24/800/600',
      gallery: [
        'https://picsum.photos/id/24/1200/800',
        'https://picsum.photos/id/20/1200/800',
        'https://picsum.photos/id/4/1200/800'
      ]
    },
    {
      id: 4,
      title: 'Moradia T4',
      location: 'Sintra',
      category: 'Construção Nova',
      coverImage: 'https://picsum.photos/id/235/800/600',
      gallery: [
        'https://picsum.photos/id/235/1200/800',
        'https://picsum.photos/id/236/1200/800',
        'https://picsum.photos/id/238/1200/800'
      ]
    },
    {
      id: 5,
      title: 'Loft Industrial',
      location: 'Marvila',
      category: 'Reabilitação',
      coverImage: 'https://picsum.photos/id/203/800/600',
      gallery: [
        'https://picsum.photos/id/203/1200/800',
        'https://picsum.photos/id/204/1200/800',
        'https://picsum.photos/id/206/1200/800'
      ]
    },
    {
      id: 6,
      title: 'Restaurante Minimalista',
      location: 'Santos, Lisboa',
      category: 'Comercial',
      coverImage: 'https://picsum.photos/id/439/800/600',
      gallery: [
        'https://picsum.photos/id/439/1200/800',
        'https://picsum.photos/id/440/1200/800',
        'https://picsum.photos/id/441/1200/800'
      ]
    }
  ];

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
