
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
      title: 'Shopping',
      location: 'Cascais',
      category: 'Comercial',
      coverImage: 'assets/portfolio/ele_01/01.jpeg',
      gallery: [
        'assets/portfolio/ele_01/01.jpeg',
        'assets/portfolio/ele_01/02.jpeg',
        'assets/portfolio/ele_01/03.jpeg',
      ]
    },
    {
      id: 2,
      title: 'Casa de Banho',
      location: 'Chiado, Lisboa',
      category: 'Remodelação',
      coverImage: 'assets/portfolio/rem_02/01.jpeg',
      gallery: [
        'assets/portfolio/rem_02/01.jpeg',
        'assets/portfolio/rem_02/02.jpeg',
        'assets/portfolio/rem_02/03.jpeg',
        'assets/portfolio/rem_02/04.jpeg',
      ]
    },
    {
      id: 3,
      title: 'Piscina',
      location: 'Açores',
      category: 'Construção Nova',
      coverImage: 'assets/portfolio/con_01/10.jpeg',
      gallery: [
        'assets/portfolio/con_01/00.jpeg',
        'assets/portfolio/con_01/01.jpeg',
        'assets/portfolio/con_01/02.jpeg',
        'assets/portfolio/con_01/03.jpeg',
        'assets/portfolio/con_01/04.jpeg',
        'assets/portfolio/con_01/05.jpeg',
        'assets/portfolio/con_01/06.jpeg',
        'assets/portfolio/con_01/07.jpeg',
        'assets/portfolio/con_01/08.jpeg',
        'assets/portfolio/con_01/09.jpeg',
        'assets/portfolio/con_01/10.jpeg',
        'assets/portfolio/con_01/11.jpeg',
        'assets/portfolio/con_01/12.jpeg',
        'assets/portfolio/con_01/13.jpeg',
      ]
    },
    {
      id: 4,
      title: 'Cozinha',
      location: 'Lisboa',
      category: 'Remodelação',
      coverImage: 'assets/portfolio/rem_03/01.jpeg',
      gallery: [
        'assets/portfolio/rem_03/01.jpeg',
        'assets/portfolio/rem_03/02.jpeg',
        'assets/portfolio/rem_03/03.jpeg',
        'assets/portfolio/rem_03/04.jpeg',
        'assets/portfolio/rem_03/05.jpeg',
        'assets/portfolio/rem_03/06.jpeg',
        'assets/portfolio/rem_03/07.jpeg',
      ]
    },
    {
      id: 5,
      title: 'Acabamento e Elétrica',
      location: 'Lisboa',
      category: 'Construção Nova',
      coverImage: 'assets/portfolio/con_02/08.jpeg',
      gallery: [
        'assets/portfolio/con_02/01.jpeg',
        'assets/portfolio/con_02/02.jpeg',
        'assets/portfolio/con_02/03.jpeg',
        'assets/portfolio/con_02/05.jpeg',
        'assets/portfolio/con_02/06.jpeg',
        'assets/portfolio/con_02/07.jpeg',
        'assets/portfolio/con_02/08.jpeg',
        'assets/portfolio/con_02/09.jpeg',
      ]
    },
    {
      id: 6,
      title: 'Restaurante Minimalista',
      location: 'Santos, Lisboa',
      category: 'Construção Nova',
      coverImage: 'assets/portfolio/con_03/04.jpeg',
      gallery: [
        'assets/portfolio/con_03/01.jpeg',
        'assets/portfolio/con_03/02.jpeg',
        'assets/portfolio/con_03/03.jpeg',
        'assets/portfolio/con_03/04.jpeg',
        'assets/portfolio/con_03/05.jpeg',
        'assets/portfolio/con_03/06.jpeg',
        'assets/portfolio/con_03/07.jpeg',
        'assets/portfolio/con_03/08.jpeg',
        'assets/portfolio/con_03/09.jpeg',
        'assets/portfolio/con_03/10.jpeg',
        'assets/portfolio/con_03/11.jpeg',
        'assets/portfolio/con_03/12.jpeg',
        'assets/portfolio/con_03/13.jpeg',
        'assets/portfolio/con_03/14.jpeg',
        'assets/portfolio/con_03/15.jpeg',
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
