import { Component } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

import { SharedModule } from '../../shared.module';

import { CharactersService } from 'src/app/services/app/characters.service';

import { ASC, DESC } from 'src/app/utils/commons.utils';

import { CharacterInfo } from 'src/app/interfaces/marvel/characters.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class HomeComponent {

  loadedCharacters: CharacterInfo[] = [];
  paginator = { limit: 18, page: 1, total: 0, orderType: ASC };

  characterSubscription$: undefined | Subscription;
  queryParamSubscription$: undefined | Subscription;
  listeners: { parent: HTMLElement | Window, id: string, callback: () => any }[] = [];

  loadingCharacters = false;
  sortingCharacters = false;
  findingCharacters = false;

  isMobile = false;

  get findText() {
    return (this.route.queryParams as BehaviorSubject<Record<string, any>>).getValue()['find'];
  }

  constructor(
    public Characters: CharactersService,
    private route: ActivatedRoute,
  ) { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.queryParamSubscription$ = this.route.queryParams.subscribe(({ find = '' }) => {
        if (find != undefined) {
          this.findingCharacters = true;

          const { limit, total } = this.paginator;

          this.Characters.replace({ limit: total < limit ? limit : total, find });

          const searcher = document.querySelector<HTMLInputElement>('#input-searcher');
          if (searcher) searcher.value = find;
        }
      });

      this.characterSubscription$ = this.Characters.characters.subscribe(list => {
        const { limit, total } = this.paginator;

        this.loadedCharacters = list.slice(0, total + limit);
        this.paginator.total = this.loadedCharacters.length;

        if (this.loadingCharacters) this.loadingCharacters = false;
        if (this.sortingCharacters) this.sortingCharacters = false;
        if (this.findingCharacters) this.findingCharacters = false;
      });

      const appHeight = () => this.isMobile = window.innerWidth < 600;

      appHeight();
      window.addEventListener('resize', appHeight);

      this.listeners.push({ parent: window, id: 'resize', callback: appHeight });
    }, 0);
  }

  /** Implementación ngx infinite scroll */
  load() {
    if (this.loadingCharacters) return;

    const { limit, total, orderType } = this.paginator;

    if (total >= this.Characters.totalResults) return;

    this.loadingCharacters = true;
    this.paginator.page++;

    if (this.Characters.totalLoaded > total) {
      this.loadedCharacters = this.Characters.characters.getValue().slice(0, total + limit);
      this.paginator.total = this.loadedCharacters.length;
      this.loadingCharacters = false;
      return;
    }

    this.Characters.load({ limit, offset: total, orderType, find: this.findText });
  }

  /** Consulta los personajes de acuerdo al filtro */
  changeSort() {
    this.sortingCharacters = true;
    this.paginator.orderType = this.paginator.orderType === ASC ? DESC : ASC;
    this.Characters.replace({ orderType: this.paginator.orderType, find: this.findText });
  }

  ngOnDestroy(): void {
    this.characterSubscription$?.unsubscribe();
    this.queryParamSubscription$?.unsubscribe();
    this.listeners.forEach(({ callback, id, parent }) => parent.removeEventListener(id, callback));
  }

}
