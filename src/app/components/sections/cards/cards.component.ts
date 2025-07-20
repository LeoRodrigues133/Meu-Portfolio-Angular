import { DatePipe } from '@angular/common';
import { itemProject } from '../portfolio/models/item-portfolio';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent {
  @Input() project!: itemProject;
  @Output() openModal = new EventEmitter<itemProject>();

  onClickCard() {
    this.openModal.emit(this.project);
  }
}
