import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  readonly socialLinks = {
    github: 'https://github.com/leorodrigues133',
    linkedin: 'https://www.linkedin.com/in/leonardorodriguesdev'
  };
  
@Output() enviar = new EventEmitter<string>();

  private readonly startStudyTime: Date = new Date(Date.UTC(2024, 2, 11));
  tempoDeEstudo: string = '';

  ngOnInit(): void {
    this.tempoDeEstudo = this.calculateStudyTime();
    this.enviar.emit(this.tempoDeEstudo);
  }

  private calculateStudyTime(): string {
    const now = new Date();
    const startYear = this.startStudyTime.getUTCFullYear();
    const startMonth = this.startStudyTime.getUTCMonth();
    const currentYear = now.getUTCFullYear();
    const currentMonth = now.getUTCMonth();

    let years = currentYear - startYear;
    let months = currentMonth - startMonth;

    if (months < 0) {
      years--;
      months += 12;
    }

    if (years === 0) {
      return months === 1 ? '1 mês' : `${months} meses`;
    }

    const yearText = years === 1 ? 'ano' : 'anos';

    if (months >= 6) {
      return `${years}+ ${yearText}`;
    }

    return `${years} ${yearText}`;
  }

}