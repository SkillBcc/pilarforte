import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js'; // Critical: Zone.js must be imported for standard Angular change detection
import { AppComponent } from './app.component';
import { appConfig } from './app.config';

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));