// swapi.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Card } from './card.model';
import { ResourceType } from './resource-type.enum';

@Injectable({
  providedIn: 'root'
})
export class SwapiService {
  private baseUrl = 'https://swapi.dev/api';

  constructor(private http: HttpClient) {}

  getCards(resourceType: ResourceType): Observable<Card[]> {
    return this.http.get<{ results: Card[] }>(`${this.baseUrl}/${resourceType}`)
      .pipe(
        map(response => response.results),
      );
  }

  getCardByUrl(url: string): Observable<Card> {
    return this.http.get<Card>(url);
  }
}
