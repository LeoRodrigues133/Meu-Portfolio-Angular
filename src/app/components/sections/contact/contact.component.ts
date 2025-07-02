import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ContactLink } from './models/contact-link';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [NgFor],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  phone:string = '49998076236';
  message:string = 'Olá, eu gostaria de falar com você!'
  
  public contactLinks: ContactLink[] = [
    {
      url: 'https://www.linkedin.com/in/leonardorodriguesdev/',
      icon: 'bi-linkedin',
      color: 'linkedin'
    },
    {
      url: 'https://github.com/leorodrigues133',
      icon: 'bi-github',
      color: 'github'
    },
    {
      url: 'https://www.instagram.com/leo_rodrigues1997/',
      icon: 'bi-instagram',
      color: 'instagram'
    }
  ];

}
