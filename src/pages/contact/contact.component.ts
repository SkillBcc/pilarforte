
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {

  constructor(private seoService: SeoService) {}

  ngOnInit() {
    this.seoService.setMetaTags(
      'Contactos e Pedidos de Orçamento | Pilar Forte',
      'Entre em contacto com a Pilar Forte. Peça um orçamento gratuito para o seu projeto de construção, engenharia civil, remodelação de moradia ou design de interiores.'
    );
    this.seoService.setJsonLdDefault();
  }

  private http = inject(HttpClient);

  isSubmitting = false;
  submitSuccess = false;
  submitError = false;

  contactForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      this.submitError = false;

      const formspreeUrl = 'https://formspree.io/f/xkowyjrd';

      this.http.post(formspreeUrl, this.contactForm.value).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.submitSuccess = true;
          this.contactForm.reset();
        },
        error: () => {
          this.isSubmitting = false;
          this.submitError = true;
        }
      });
    } else {
      this.contactForm.markAllAsTouched();
    }
  }
}
