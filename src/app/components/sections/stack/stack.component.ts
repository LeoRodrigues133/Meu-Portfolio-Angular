import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ItemStack } from './models/item-stack';

@Component({
  selector: 'app-stack',
  standalone: true,
  imports: [NgFor],
  templateUrl: './stack.component.html',
  styleUrls: ['./stack.component.scss'],
})
export class StackComponent {
  public stackItems: ItemStack[] = [
    {
      name: 'Angular',
      link: 'https://img.icons8.com/?size=100&id=dSnah6CSCxRG&format=png&color=000000',
      icon: '',
      stack: 'Front-end'
    },
    {
      name: 'HTML5',
      link: 'https://img.icons8.com/?size=100&id=20909&format=png&color=000000',
      icon: '',
      stack: 'Front-end'
    },
    {
      name: 'CSS3',
      link: 'https://img.icons8.com/?size=100&id=21278&format=png&color=000000',
      icon: '',
      stack: 'Front-end'
    },
    {
      name: 'Bootstrap',
      link: 'https://img.icons8.com/?size=100&id=PndQWK6M1Hjo&format=png&color=000000',
      icon: '',
      stack: 'Front-end'
    },
    {
      name: 'Node.js',
      link: 'https://img.icons8.com/?size=100&id=54087&format=png&color=000000',
      icon: '',
      stack: 'Back-end'
    },
    {
      name: 'JavaScript',
      link: 'https://img.icons8.com/?size=100&id=108784&format=png&color=000000',
      icon: '',
      stack: 'Back-end'
    },
    {
      name: 'TypeScript',
      link: 'https://img.icons8.com/?size=100&id=uJM6fQYqDaZK&format=png&color=000000',
      icon: '',
      stack: 'Back-end'
    },
    {
      name: '.NET',
      link: 'https://img.icons8.com/?size=100&id=1BC75jFEBED6&format=png&color=000000',
      icon: '',
      stack: 'Back-end'
    },
    {
      name: 'ASP.NET',
      link: '',
      icon: 'icons/asp-file.png',
      stack: 'Back-end'
    },
    {
      name: 'Entity Framework',
      link: '',
      icon: 'icons/ef-core.png',
      stack: 'Back-end'
    },
    // {
    //   name: 'MongoDB',
    //   link: 'https://img.icons8.com/?size=100&id=74402&format=png&color=000000',
    //   icon: '',
    //   stack: 'Back-end'
    // },
    // {
    //   name: 'PostgreSQL',
    //   link: 'https://img.icons8.com/?size=100&id=38561&format=png&color=000000',
    //   icon: '',
    //   stack: 'Back-end'
    // },
    {
      name: 'MySQL',
      link: 'https://img.icons8.com/?size=100&id=UFXRpPFebwa2&format=png&color=000000',
      icon: '',
      stack: 'Back-end'
    },
    {
      name: 'Git',
      link: 'https://img.icons8.com/?size=100&id=xBKl2pdJg5kk&format=png&color=000000',
      icon: '',
      stack: 'Back-end'
    },
    {
      name: 'Swagger',
      link: '',
      icon: 'icons/swagger.png',
      stack: ''
    },
    {
      name: 'Postman',
      link: 'https://img.icons8.com/?size=100&id=EPbEfEa7o8CB&format=png&color=000000',
      icon: '',
      stack: ''
    }, {
      name: 'Azure',
      link: 'https://img.icons8.com/?size=100&id=VLKafOkk3sBX&format=png&color=000000',
      icon: '',
      stack: ''
    },
    {
      name: 'Selenium',
      link: 'https://img.icons8.com/?size=100&id=38553&format=png&color=000000',
      icon: '',
      stack: ''
    },
    {
      name: 'Cypress',
      link: '',
      icon: 'icons/cypress.png',
      stack: ''
    }
  ];


  get frontendStack() {
    return this.stackItems.filter(item => item.stack === 'Front-end');
  }

  get backendStack() {
    return this.stackItems.filter(item => item.stack === 'Back-end');
  }

  get otherStack() {
    return this.stackItems.filter(item => item.stack === '');
  }

}