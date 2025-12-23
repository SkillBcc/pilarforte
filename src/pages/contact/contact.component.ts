
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  contactForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    if (this.contactForm.valid) {
      alert('Obrigado pelo seu contacto. A equipa Pilar Forte entrará em contacto brevemente.');
      this.contactForm.reset();
    } else {
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
  }
}
