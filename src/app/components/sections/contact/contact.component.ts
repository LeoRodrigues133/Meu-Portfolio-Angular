import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import emailjs from 'emailjs-com';

interface ContactLink {
  url: string;
  icon: string;
  color: string;
  label: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  phone: string = '49998076236';
  message: string = 'Olá, eu gostaria de falar com você!';
  
  emailForm = {
    name: '',
    email: '',
    phone: '',
    isWhatsapp: false,
    subject: '',
    message: ''
  };
  
  isSubmitted: boolean = false;
  submitStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  errorMessage: string = '';
  
  public contactLinks: ContactLink[] = [
    {
      url: 'https://www.linkedin.com/in/leonardorodriguesdev/',
      icon: 'bi-linkedin',
      color: 'linkedin',
      label: 'LinkedIn'
    },
    {
      url: 'https://github.com/leorodrigues133',
      icon: 'bi-github',
      color: 'github',
      label: 'GitHub'
    },
    {
      url: 'https://www.instagram.com/leo_rodrigues1997/',
      icon: 'bi-instagram',
      color: 'instagram',
      label: 'Instagram'
    }
  ];

  private validateForm(): boolean {
    if (!this.emailForm.name.trim()) {
      this.errorMessage = 'Por favor, preencha seu nome';
      return false;
    }
    
    if (!this.emailForm.email.trim()) {
      this.errorMessage = 'Por favor, preencha seu email';
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.emailForm.email)) {
      this.errorMessage = 'Por favor, insira um email válido';
      return false;
    }
    
    if (!this.emailForm.subject.trim()) {
      this.errorMessage = 'Por favor, preencha o assunto';
      return false;
    }
    
    if (!this.emailForm.message.trim()) {
      this.errorMessage = 'Por favor, escreva sua mensagem';
      return false;
    }
    
    return true;
  }

  private resetForm(): void {
    this.emailForm = {
      name: '',
      email: '',
      phone: '',
      isWhatsapp: false,
      subject: '',
      message: ''
    };
    this.submitStatus = 'idle';
    this.isSubmitted = false;
    this.errorMessage = '';
  }

  onSubmitEmail(): void {
    this.isSubmitted = true;
    this.errorMessage = '';
    
    if (!this.validateForm()) {
      this.submitStatus = 'error';
      setTimeout(() => {
        this.submitStatus = 'idle';
      }, 3000);
      return;
    }
    
    this.submitStatus = 'loading';
    
    const templateParams = {
      from_name: this.emailForm.name,
      from_email: this.emailForm.email,
      phone: this.emailForm.phone || 'Não informado',
      whatsapp: this.emailForm.isWhatsapp ? 'Sim' : 'Não',
      subject: this.emailForm.subject,
      message: this.emailForm.message
    };
    
    emailjs.send(
      'service_1s0ku4k',
      'template_lh29x3d',
      templateParams,
      't3qcGzUFcWUD_ntcC'
    )
    .then(() => {
      this.submitStatus = 'success';
      
      setTimeout(() => {
        this.resetForm();
      }, 3000);
    })
    .catch((error) => {
      console.error('Erro ao enviar email:', error);
      this.submitStatus = 'error';
      this.errorMessage = 'Erro ao enviar mensagem. Tente novamente.';
      
      setTimeout(() => {
        this.submitStatus = 'idle';
      }, 3000);
    });
  }
}