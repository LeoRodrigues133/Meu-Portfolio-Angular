import { Component, EventEmitter, Input, Output } from '@angular/core';
import { itemProject } from '../portfolio/models/item-portfolio';
import { DatePipe, NgIf } from '@angular/common';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-card-modal',
  standalone: true,
  imports: [DatePipe, NgIf],
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.scss'],
})
export class CardModalComponent {
  @Input() project!: itemProject | null;
  @Output() closeModal = new EventEmitter<void>();

  onClose() {
    this.closeModal.emit();
  }

  selectedImageUrl!: string;
  modalFullscreen: bootstrap.Modal | null = null;

  openImageFullscreen(url: string) {
    this.selectedImageUrl = url;
    const modalElement = document.getElementById('imageModal');
    if (modalElement) {
      this.modalFullscreen = bootstrap.Modal.getOrCreateInstance(modalElement);
      this.modalFullscreen.show();
    }
  }

  closeImageFullscreen() {
    this.modalFullscreen?.hide();
  }

  //there a recursion error, idk how to fix it for now, if you know show me pls :D.
}