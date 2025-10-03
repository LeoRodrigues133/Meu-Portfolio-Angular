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
      icon: 'bi bi-window',
      title: 'Frontend com Angular',
      description: 'Desenvolvimento de interfaces modernas e responsivas usando Angular, TypeScript e Bootstrap.',
    },
    {
      icon: 'bi bi-cpu',
      title: 'Backend com .NET',
      description: 'Criação de APIs RESTful robustas e escaláveis com C# e ASP.NET Core.',
    },
    {
      icon: 'bi bi-bezier2',
      title: 'Arquitetura de Software',
      description: 'Planejamento e construção de sistemas multi-camadas com separação de responsabilidades.',
    },
    {
      icon: 'bi bi-diagram-3',
      title: 'Integração de APIs',
      description: 'Consumo e integração de serviços externos com tratamento eficiente de dados e erros.',
    },
    {
      icon: 'bi bi-shield-check',
      title: 'Testes Automatizados',
      description: 'Escrita de testes unitários e de integração com NUnit e Selenium para garantir qualidade do código.',
    },
    {
      icon: 'bi bi-git',
      title: 'Git e GitHub',
      description: 'Controle de versão com Git, uso de branches, PRs e revisão de código em ambientes colaborativos.',
    },
    {
      icon: 'bi bi-cloud-upload',
      title: 'Implantação e VPS',
      description: 'Publicação e manutenção de sistemas em servidores VPS e ambientes de nuvem.',
    },
    {
      icon: 'bi bi-journals',
      title: 'Documentação Técnica',
      description: 'Criação de documentação clara para funcionalidades, APIs e processos de desenvolvimento.',
    },
    {
      icon: 'bi bi-people',
      title: 'Trabalho em Equipe',
      description: 'Participação em times ágeis com foco em colaboração, entregas frequentes e melhoria contínua.',
    },
    {
      icon: 'bi bi-person-arms-up',
      title: 'Apoio Técnico',
      description: 'Acompanhamento de outros devs com revisão de código e suporte técnico em boas práticas.',
    }
  ];
}
