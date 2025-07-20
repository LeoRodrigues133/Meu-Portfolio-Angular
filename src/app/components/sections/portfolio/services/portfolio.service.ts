import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class githubService {

  baseUrl: string = environment.API_URL;


  constructor(private http: HttpClient) { }

  getRepository() {

    return this.http.get<any>(
      `${this.baseUrl}user`);
  }

  getProject(repository: string) {

    const getUrl = `${this.baseUrl}project/${repository}`;

    return this.http.get<any>(getUrl);
  }

  getLastCommit(repoName: string): Observable<any> {
  const url = `https://api.github.com/repos/leorodrigues133/${repoName}/commits`;
  return this.http.get<any[]>(url).pipe(
    map(commits => commits[0]), // pega o último commit (mais recente)
    catchError(() => of(null))
  );
}
}