import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ItemSkill } from './models/item-skills';


@Component({
  selector: 'app-skill',
  standalone: true,
  imports: [NgFor],
  templateUrl: './skill.component.html',
  styleUrls: [`./skill.component.scss`],
})
export class SkillComponent {

  public skills: ItemSkill[] = [
    {
      icon: 'bi bi-window-fullscreen',
      title: 'Web Design',
      description: 'Design e desenvolvimento de sistemas web atraentes e responsivos.',
    },
    {
      icon: 'bi bi-server',
      title: 'Aplicações Back-end',
      description: 'Desenvolvimento de sistemas robustos para solucionar problemas simples ou complexos.',
    },
    {
      icon: 'bi bi-robot',
      title: 'Testes Automatizados',
      description: 'Criação de testes automatizados que facilitam a manutenção e melhoram as entregas das aplicações.',
    },
    {
      icon: 'bi bi-wrench',
      title: 'Engenharia de Software',
      description: 'Planejamento e execução de sistemas multi-camadas, integrando várias tecnologias de forma organizada e escalável.',
    },
    {
      icon: 'bi bi-building-gear',
      title: 'Implantação',
      description: 'Implantação e manutenção de sistemas em servidores VPS e em nuvem.',
    }
  ];
}
