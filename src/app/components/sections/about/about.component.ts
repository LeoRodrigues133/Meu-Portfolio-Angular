import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  @Input() openModal!: () => void;


  startStudyTime: Date = new Date(Date.UTC(2024, 4, 18)); // Maio = mês 4

  studyTime: string = '';

  ngOnInit() {
    const now = new Date();
    this.studyTime = this.formatElapsedTime(this.startStudyTime, now);
  }

  formatElapsedTime(start: Date, end: Date): string {
    let years = end.getUTCFullYear() - start.getUTCFullYear();
    let months = end.getUTCMonth() - start.getUTCMonth();
    let plural = years !== 1 ? 's' : '';

    if (months < 0) {
      years--;
      months += 12;
    }

    return `${years} ano${plural}`;

  }

  downloadCV() {
    const link = document.createElement('a');
    link.href = 'assets/cv/Curriculo_Leo_Rodrigues.pdf';
    link.download = 'Curriculo_Leo_Rodrigues.pdf';
    link.click();
  }

}