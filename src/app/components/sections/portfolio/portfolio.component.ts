import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { githubService } from './services/github.service';
import { environment } from '../../../../environments/environment.development';
import { forkJoin, of } from 'rxjs';
import { catchError, filter, map, mergeMap, switchMap, toArray } from 'rxjs/operators';
import { itemProject } from './models/item-portfolio';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [NgFor,NgIf],
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent implements OnInit {
  public projects: itemProject[] = [];

  constructor(private gitService: githubService) { }

  ngOnInit(): void {
    this.gitService.getRepository().pipe(
      switchMap((repositories: any[]) =>
        forkJoin(
          repositories.map(repo =>
            this.gitService.checkFileExist( repo.name).pipe(
              switchMap(exists => {
                if (exists) {
                  return this.gitService.getProject( repo.name).pipe(
                    map(fileData => {
                      const json = this.decoder(fileData.content);
                      return {
                        title: json.title,
                        description: json.description,
                        gitUrl: repo.html_url,
                        gifUrl: json.gif
                      } as itemProject;
                    }),
                    catchError(() => of(null)) 
                  );
                } else {
                  return of(null);
                }
              }),
              catchError(() => of(null))
            )
          )
        )
      ),
      map(results => results.filter(p => p !== null))
    ).subscribe(projects => {
      this.projects = projects;
    });
  }

  private decoder(content: string): any {
    const binaryString = window.atob(content);
    const bytes = Uint8Array.from(binaryString, char => char.charCodeAt(0));
    const decodedContent = new TextDecoder('utf-8').decode(bytes);
    return JSON.parse(decodedContent);
  }
}
