import '@angular/compiler';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { AppComponent } from './src/app.component';
import { routes } from './src/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    // Use the stable API for zoneless change detection
    provideZonelessChangeDetection(),
    provideRouter(
      routes, 
      withHashLocation(),
      withInMemoryScrolling({ scrollPositionRestoration: 'top' }),
      withViewTransitions()
    )
  ]
}).catch((err) => console.error(err));

// AI Studio always uses an `index.tsx` file for all project types.
