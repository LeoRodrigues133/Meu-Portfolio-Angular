import { NgClass, NgForOf, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
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
    PortfolioComponent
  ],
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  isModalVisible: boolean = false;


  openModal() {
    this.isModalVisible = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.isModalVisible = false;
    document.body.style.overflow = '';
  }

}
