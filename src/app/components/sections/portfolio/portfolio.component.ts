import { NgFor, NgIf } from '@angular/common';
import { forkJoin, Observable, of } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { itemProject } from './models/item-portfolio';
import { CardsComponent } from '../cards/cards.component';
import { githubService } from './services/portfolio.service';
import { catchError, map, switchMap, } from 'rxjs/operators';
import { CardModalComponent } from '../card-modal/card-modal.component';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [NgFor, NgIf, CardsComponent, CardModalComponent],
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})

export class PortfolioComponent implements OnInit {
  public allProjects: itemProject[] = [];
  public displayedProjects: itemProject[] = [];

  public findedRepositories: number = 0;
  public currentPage: number = 0;
  public pageSize: number = 3;

  public selectedProject: itemProject | null = null;

  constructor(private gitService: githubService) { }
  ngOnInit(): void {

    if (this.allProjects.length > 0)
      return;

    else {
      this.LoadConfiguredProjects()

    }
  }

  public openProjectModal(project: itemProject) {
    this.selectedProject = project;
  }

  public LoadMoreProjects(): void {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    const index = end > this.findedRepositories ? this.findedRepositories : end;
    const nextProjects = this.allProjects.slice(start, index);

    this.displayedProjects = [...this.displayedProjects, ...nextProjects];
    // add in display more three projects, after the already displayed

    this.currentPage++;
  }

  public LoadConfiguredProjects(): any {
    this.gitService.getRepository()
      .pipe(
        switchMap((repositories: any[]) =>
          forkJoin(repositories
            .map(repository =>
              this.CreateItemProject(repository)))
          // calls the GitHub API to get all repositories.
          // uses switchmap and forkjoin to proccess the repositories in parallel,
          // then filter by configured or not.
        ),

        map(results =>
          results.filter(p => p !== null))
      ).subscribe(projects => {

        projects.sort((a, b) => {
          if (a.isConfigured === b.isConfigured) {
            return b.lastestUpdate.getTime() - a.lastestUpdate.getTime();
          }
          return a.isConfigured ? -1 : 1;
        });
        // filters the projects first by configuration, then by lastest update.

        this.allProjects = projects;

        this.findedRepositories = this.allProjects.length;

        this.LoadMoreProjects();

      }), catchError(() => of(null));

  }

  private CreateItemProject(repository: any): Observable<itemProject | null> {
    return this.gitService.getProject(repository.name).pipe(
      map(fileData => {
        const json = this.decoder(fileData.content)
        const configuredProject = this.MapProjectFromJson(json, repository);
        // If finded portfólio.json in repository, it maps the project, push it in the configuredPrjects array.

        return configuredProject;
      }),
      catchError(() => of(this.MapProject(repository)))
      // If json is not finded, it returns null, so before it's discarted, is pushed to unconfiguredProjects array.
    );
  }

  private MapProjectFromJson(json: any, repository: any): itemProject {
    return {
      title: json.title,
      description: json.description,
      gitUrl: repository.html_url,
      gifUrl: json.gif,
      lastestUpdate: new Date(repository.updated_at),
      lastCommit: json.lastCommit || 'Nenhum commit encontrado', // Added to avoid a new request to the Api github, avoiding unnecessary calls.
      isConfigured: true
    }
  }

  private MapProject(repository: any): itemProject {
    return {
      title: repository.name,
      description: repository.description,
      gitUrl: repository.html_url,
      gifUrl: "https://raw.githubusercontent.com/LeoRodrigues133/Meu-Portfolio-Angular/refs/heads/master/public/assets/SemImagem.PNG",
      lastestUpdate: new Date(repository.updated_at),
      lastCommit: 'Nenhum commit encontrado',
      isConfigured: false,
    }
  }

  private decoder(content: string): any {
    const binaryString = window.atob(content);
    const bytes = Uint8Array.from(binaryString, char => char.charCodeAt(0));
    const decodedContent = new TextDecoder('utf-8').decode(bytes);
    return JSON.parse(decodedContent);
  }
}

