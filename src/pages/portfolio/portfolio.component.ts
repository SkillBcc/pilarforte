
import { Component, signal, WritableSignal, computed, OnDestroy } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { PortfolioService, ProjectItem } from '../../services/portfolio.service';

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

  projects: ProjectItem[] = [];

  constructor(private portfolioService: PortfolioService) {
    this.projects = this.portfolioService.getProjects();
  }

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
