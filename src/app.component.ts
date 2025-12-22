import { Component, signal, ChangeDetectionStrategy, PLATFORM_ID, inject, Inject } from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
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

  constructor(@Inject(DOCUMENT) private document: Document, @Inject(PLATFORM_ID) private platformId: Object) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.mobileMenuOpen.set(false);
        // Scroll restoration is handled by provideRouter configuration (withInMemoryScrolling)
      }
    });

    this.initFaviconTheme();
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

  // Detect and update favicon based on system theme preference (Dark Mode)
  private initFaviconTheme() {
    if (isPlatformBrowser(this.platformId)) {
      const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      const updateFavicon = (isDark: boolean) => {
        const faviconLink = this.document.getElementById('app-favicon') as HTMLLinkElement;
        if (faviconLink) {
          faviconLink.href = isDark ? 'favicon-white.svg' : 'favicon.svg';
        }
      };

      // Initial check
      updateFavicon(darkQuery.matches);

      // Listen for changes
      darkQuery.addEventListener('change', (e) => updateFavicon(e.matches));
    }
  }
}