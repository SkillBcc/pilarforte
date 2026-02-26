
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ServicesService, ServiceItem } from '../../services/services.service';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent implements OnInit {
  services: ServiceItem[] = [];

  constructor(private servicesService: ServicesService, private seoService: SeoService) {
    this.services = this.servicesService.getServices();
  }

  ngOnInit() {
    this.seoService.setMetaTagsDefault();
    this.seoService.setJsonLdDefault();
  }
}
