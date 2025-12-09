import { NgFor } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit, HostListener } from '@angular/core';

declare var bootstrap: any;

interface NavItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgFor],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit, AfterViewInit, OnDestroy {
  navItems: NavItem[] = [
    { label: 'Início', icon: 'bi bi-house', route: '#Home' },
    { label: 'Sobre', icon: 'bi bi-person', route: '#About' },
    { label: 'Habilidades', icon: 'bi bi-flask-florence', route: '#Skills' },
    { label: 'Stack', icon: 'bi bi-stack', route: '#Stack' },
    { label: 'Projetos', icon: 'bi bi-hexagon-half', route: '#Portfolio' },
    { label: 'Contato', icon: 'bi bi-envelope', route: '#Contact' }
  ];

  activeRoute: string = '#Home';
  private tooltipList: any[] = [];
  private sections: HTMLElement[] = [];

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.initializeSections();
    }, 100);
  }

  ngAfterViewInit(): void {
    this.initializeTooltips();
  }

  ngOnDestroy(): void {
    this.disposeTooltips();
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.updateActiveSection();
  }

  private initializeSections(): void {
    this.sections = this.navItems
      .map(item => document.querySelector(item.route) as HTMLElement)
      .filter(section => section !== null);
  }

  private updateActiveSection(): void {
    const scrollPosition = window.scrollY + 100;

    for (let i = this.sections.length - 1; i >= 0; i--) {
      const section = this.sections[i];
      if (section && section.offsetTop <= scrollPosition) {
        const newRoute = `#${section.id}`;
        if (this.activeRoute !== newRoute) {
          this.activeRoute = newRoute;
        }
        return;
      }
    }

    this.activeRoute = '#Home';
  }

  private initializeTooltips(): void {
    if (typeof bootstrap !== 'undefined') {
      const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
      this.tooltipList = Array.from(tooltipTriggerList).map(tooltipTriggerEl =>
        new bootstrap.Tooltip(tooltipTriggerEl, {
          trigger: 'hover',
          delay: { show: 100, hide: 200 },
          placement: 'left',
          animation: true,
          customClass: 'tooltip-fade'
        })
      );

      this.tooltipList.forEach(tooltip => {
        if (tooltip)
          tooltip.show();
      });
    }

    let time = 2000;
    this.tooltipList.forEach((tooltip, index) => {
      setTimeout(() => {
        if (tooltip) {
          tooltip.hide();
        }
      }, time + (index * 200));
    });
  }


  private disposeTooltips(): void {
    this.tooltipList.forEach(tooltip => {
      if (tooltip) {
        tooltip.dispose();
      }
    });
    this.tooltipList = [];
  }

  setActive(route: string): void {
    this.activeRoute = route;

    const targetId = route.substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
}