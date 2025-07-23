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
  
}