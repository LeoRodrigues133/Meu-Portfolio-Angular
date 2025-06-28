import { NgClass, NgFor } from '@angular/common'
import { itemProject } from './models/item-portfolio';
import { Component } from '@angular/core';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [NgFor, NgClass],
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent {
  public itemProjects: itemProject[] = [{
    title: 'Projeto 1',
    img: '',
    description: '',
    url: ''
  }]
}
