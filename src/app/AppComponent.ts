import { NgClass, NgForOf, NgIf } from '@angular/common';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/NavbarComponent';
import { AboutComponent } from './components/sections/about/about.component';
import { ModalComponent } from './components/modal/modal.component';
import { PortfolioComponent } from "./components/sections/portfolio/portfolio.component";
import { ContactComponent } from './components/sections/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { SkillComponent } from './components/sections/skill/skill.component';
import { StackComponent } from './components/sections/stack/stack.component';
import { HomeComponent } from "./components/sections/home/home.component";
import AOS from 'aos'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule,
    AboutComponent,
    SkillComponent,
    ModalComponent,
    FooterComponent,
    StackComponent,
    NavbarComponent,
    ContactComponent,
    PortfolioComponent,
    HomeComponent
  ],
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent implements OnInit {
  isModalVisible: boolean = false;
  tempoDeEstudo = '';

  ngOnInit(): void {


    window.addEventListener('load', () => {
      setTimeout(() => {
        AOS.init({
          delay: 1000,
          disable: false
        });
      }, 2000);
    });
  }

  ReceberTempo(tempo: string) {
    this.tempoDeEstudo = tempo;
  }


  openModal() {
    this.isModalVisible = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.isModalVisible = false;
    document.body.style.overflow = '';
  }

}
