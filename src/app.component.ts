
import { Component, signal, ChangeDetectionStrategy, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
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
        // Scroll restoration is handled by provideRouter configuration (withInMemoryScrolling)
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
