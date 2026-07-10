import '@angular/compiler';
import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './src/app.component';
import { appConfig } from './src/app.config';

bootstrapApplication(AppComponent, appConfig).catch((err: any) => console.error(err));

// AI Studio always uses an `index.tsx` file for all project types.
