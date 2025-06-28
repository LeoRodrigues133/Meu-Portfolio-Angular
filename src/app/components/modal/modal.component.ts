import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, NgModule, Output } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})

export class ModalComponent {
  title: string = 'Mensagem';
  message: string = '';
  mailtoUrl: string = '';
  Email: string = 'leokrodrigues133@gmail.com';
  @Input() isVisible: boolean = true;
  @Output() onClose = new EventEmitter<void>();

  closeModal() {
    this.onClose.emit();
    document.body.style.overflow = '';
  }

  sendMail() {
    const assunto = this.message.trim() === ''
      ? 'Ví seu portfólio!'
      : this.message.trim();

    const mailtoUrl = `mailto:${this.Email}?subject=${encodeURIComponent(assunto)}`;
    window.open(mailtoUrl, '_blank', 'noopener,noreferrer');

    this.message = '';
    this.closeModal();
  }

  sendMessage() {
    const phone = '+554998076236'; // use localmente aqui
    let texto = '';

    if (this.message.trim() === '') {
      texto = 'Olá, eu gostaria de falar com você!';
    } else {
      texto = `Olá, eu gostaria de falar sobre: ${this.message}`;
    }

    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(texto)}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    this.message = '';
    this.closeModal();
  }
}
