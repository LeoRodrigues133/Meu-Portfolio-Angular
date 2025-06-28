import { NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgClass,NgFor, FormsModule],
  templateUrl: "navbar.component.html",
  styleUrl: "navbar.component.scss",
})
export class NavbarComponent {
  isCollapsed: boolean = false;

  navItems = [
    { label: 'Inicio', icon: 'bi bi-house', route: '#Home' },
    { label: 'Sobre', icon: 'bi bi-person', route: '#About' },
    { label: 'Projetos', icon: 'bi bi-briefcase', route: '#Portfolio' },
    { label: 'Habilidades', icon: 'bi bi-tools', route: '#Skills' },
    { label: 'Stack', icon: 'bi bi-stack', route: '#Stack' },
    { label: 'Contato', icon: 'bi bi-envelope', route: '#Contact' }
  ];
}
