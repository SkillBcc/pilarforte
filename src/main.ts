import { bootstrapApplication } from '@angular/platform-browser';
import { provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideZoneChangeDetection(),
    provideRouter(
      routes, 
      withHashLocation(),
      withInMemoryScrolling({ scrollPositionRestoration: 'top' }),
      withViewTransitions()
    )
  ]
}).catch((err) => console.error(err));