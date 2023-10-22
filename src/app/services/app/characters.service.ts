import { Injectable, computed, effect } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { CharactersService as RestCharactersService } from '../rest/marvel/characters.service';

import { CharacterInfo } from 'src/app/interfaces/marvel/characters.interface';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  characters = new BehaviorSubject<CharacterInfo[]>([]);
  totalResults = 0;

  get totalLoaded() {
    return this.characters.getValue().length;
  }

  constructor(
    private characterService: RestCharactersService
  ) { }

  /**
   * Consulta nuevos personajes de acuerdo a los filtros
   * @param filters Filtros opcionales
   */
  load(filters?: Partial<{ limit: number; offset: number; orderType: string; find: string; }>) {
    this.characterService.get(filters).subscribe(({ results, total }) => {
      const characters = this.characters.getValue();
      this.characters.next([...characters, ...results]);
      this.totalResults = total;
    });
  }

  /**
   * Reemplaza los personajes consultados de acuerdo a los filtros
   * @param filters Filtros opcionales
   */
  replace(filters: Partial<{ limit: number; orderType: string; find: string; }> = {}) {
    let limit = this.characters.getValue().length;
    if (filters.limit) limit = limit < filters.limit ? filters.limit : limit;
    limit = limit > 100 ? 100 : limit;

    this.characterService.get({ ...filters, limit }).subscribe(({ results, total }) => {
      this.characters.next(results);
      this.totalResults = total;
    });
  }

}
