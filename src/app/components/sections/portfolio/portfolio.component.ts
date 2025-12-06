import { NgFor, NgIf } from '@angular/common';
import { forkJoin, Observable, of } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { itemProject } from './models/item-portfolio';
import { CardsComponent } from '../cards/cards.component';
import { githubService } from './services/portfolio.service';
import { catchError, map, switchMap } from 'rxjs/operators';
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
  public savedProjects? = this.readFromLocalStorage('Portfolio | Leo Rodrigues');

  public foundRepositories: number = 0;
  public currentPage: number = 0;
  public pageSize: number = 3;

  public selectedProject: itemProject | null = null;

  constructor(private gitService: githubService) {
    const minutes = (tempo: number): number => tempo * 60000;

    setInterval(() => {
      this.loadConfiguredProjects(this.savedProjects);
      console.log('Buscando atualizações!')
    }, minutes(10));
  }

  ngOnInit(): void {

    if (this.savedProjects) {
      this.allProjects = this.savedProjects.map((json: any) => ({ ...json }));
      this.foundRepositories = this.allProjects.length;
      this.loadMoreProjects();
      this.loadConfiguredProjects(this.savedProjects);
    } else {
      this.loadConfiguredProjects();
    }
  }

  public openProjectModal(project: itemProject) {
    this.selectedProject = project;
  }

  public loadMoreProjects(): void {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    const index = end > this.foundRepositories ? this.foundRepositories : end;
    const nextProjects = this.allProjects.slice(start, index);

    this.displayedProjects = [...this.displayedProjects, ...nextProjects];
    this.currentPage++;
  }

  public loadConfiguredProjects(cachedProjects?: itemProject[]): void {
    this.gitService
      .getRepository()
      .pipe(
        switchMap((repositories: any[]) =>
          forkJoin(repositories.map((repository) => this.createItemProject(repository)))
        ),
        map((results) => results.filter((p) => p !== null)),
        catchError(() => of([]))
      )
      .subscribe((projects: itemProject[]) => {
        projects.sort((a, b) => {
          if (a.isConfigured === b.isConfigured) {
            return b.lastestUpdate.getTime() - a.lastestUpdate.getTime();
          }
          return a.isConfigured ? -1 : 1;
        });

        if (!cachedProjects) {
          this.allProjects = projects;
          this.foundRepositories = projects.length;
          this.loadMoreProjects();
          this.saveInLocalStorage('Portfolio | Leo Rodrigues', this.allProjects);
          return;
        }

        if (!this.compareData(cachedProjects, projects)) {
          this.allProjects = projects;
          this.foundRepositories = projects.length;
          this.displayedProjects = [];
          this.currentPage = 0;
          this.loadMoreProjects();
          this.saveInLocalStorage('Portfolio | Leo Rodrigues', this.allProjects);
        }
      });
  }

  private createItemProject(repository: any): Observable<itemProject | null> {
    return this.gitService.getProject(repository.name).pipe(
      map((fileData) => {
        const json = this.decode(fileData.content);
        return this.mapProjectFromJson(json, repository);
      }),
      catchError(() => of(this.mapProject(repository)))
    );
  }

  private mapProjectFromJson(json: any, repository: any): itemProject {
    return {
      title: json.title,
      description: json.description,
      gitUrl: repository.html_url,
      gifUrl: json.gif,
      lastestUpdate: new Date(repository.updated_at),
      lastCommit: json.lastCommit || 'No commit found',
      isConfigured: true,
    };
  }

  private mapProject(repository: any): itemProject {
    return {
      title: repository.name,
      description: repository.description,
      gitUrl: repository.html_url,
      gifUrl:
        'https://raw.githubusercontent.com/LeoRodrigues133/Meu-Portfolio-Angular/refs/heads/master/public/assets/SemImagem.png',
      lastestUpdate: new Date(repository.updated_at),
      lastCommit: 'No commit found',
      isConfigured: false,
    };
  }

  private decode(content: string): any {
    const binaryString = window.atob(content);
    const bytes = Uint8Array.from(binaryString, (char) => char.charCodeAt(0));
    const decodedContent = new TextDecoder('utf-8').decode(bytes);
    return JSON.parse(decodedContent);
  }

  private saveInLocalStorage(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  private readFromLocalStorage(key: string): any | null {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  private compareData(localstorage: itemProject[], request: itemProject[]): boolean {
    if (!localstorage || !request) return false;
    if (localstorage.length !== request.length) return false;

    const mapLocal = new Map(localstorage.map((p) => [p.title, p]));
    const mapReq = new Map(request.map((p) => [p.title, p]));

    for (let [title, repo] of mapReq) {
      const local = mapLocal.get(title);
      if (!local) return false;

      const localDate = new Date(local.lastestUpdate).getTime();
      const repoDate = new Date(repo.lastestUpdate).getTime();

      if (localDate !== repoDate || local.lastCommit !== repo.lastCommit) {
        return false;
      }
    }

    return true;
  }
}
