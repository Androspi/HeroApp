import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

import { HttpUtils } from 'src/app/utils/http.utils';
import { ASC, DESC } from 'src/app/utils/commons.utils';

import { CharacterInfo } from 'src/app/interfaces/marvel/characters.interface';
import { MarvelResponse } from 'src/app/interfaces/marvel/common.interface';
import { ComicInfo } from 'src/app/interfaces/marvel/comics.interface';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  key = environment.marvel.publicKey;
  root = environment.marvel.api;

  constructor(
    private httpUtils: HttpUtils,
    private http: HttpClient,
  ) { }

  find(id: number) {
    const query = this.httpUtils.toQueryParams({ apikey: this.key });
    return this.http.get<MarvelResponse<CharacterInfo>>(`${this.root}characters/${id}${query}`);
  }

  get({ limit, offset = 0, orderType, find }: Partial<{ limit: number; offset: number; orderType: string; find: string; }> = {}) {
    const orderBy = orderType === ASC ? 'name' : (orderType === DESC ? '-name' : undefined);
    const query = this.httpUtils.toQueryParams({ apikey: this.key, limit, offset, orderBy, nameStartsWith: find });
    return this.http.get<MarvelResponse<CharacterInfo>>(`${this.root}characters${query}`);
  }

  comics({ characterId }: { characterId: number; }) {
    const query = this.httpUtils.toQueryParams({ apikey: this.key });
    return this.http.get<MarvelResponse<ComicInfo>>(`${this.root}characters/${characterId}/comics${query}`);
  }

}
