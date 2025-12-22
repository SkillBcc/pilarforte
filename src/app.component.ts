
import { Component, signal, ChangeDetectionStrategy, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage, isPlatformBrowser } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RouterOutlet, RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  host: {
    '(window:scroll)': 'onWindowScroll()'
  }
})
export class AppComponent {
  mobileMenuOpen = signal(false);
  isScrolled = signal(false);
  currentYear = new Date().getFullYear();

  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  constructor() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.mobileMenuOpen.set(false);
        if (isPlatformBrowser(this.platformId)) {
          window.scrollTo(0, 0);
        }
      }
    });
  }

  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      // Ativa o modo 'scrolled' após 20px de descida
      this.isScrolled.set(window.scrollY > 20);
    }
  }

  toggleMenu() {
    this.mobileMenuOpen.update(v => !v);
  }

  closeMenu() {
    this.mobileMenuOpen.set(false);
  }
}
