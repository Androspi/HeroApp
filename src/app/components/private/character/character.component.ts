import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';

import { SharedModule } from '../../shared.module';

import { CharactersService } from 'src/app/services/rest/marvel/characters.service';
import { CharacterInfo } from 'src/app/interfaces/marvel/characters.interface';
import { MatDialog } from '@angular/material/dialog';
import { DetailCardComponent } from './detail-card/detail-card.component';
import { ComicInfo } from 'src/app/interfaces/marvel/comics.interface';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class CharacterComponent implements AfterViewInit, OnDestroy {

  comics: ComicInfo[] = [];
  character?: CharacterInfo;

  #characterSubscription$: undefined | Subscription;
  #comicsSubscription$: undefined | Subscription;
  #routeSubscription$: undefined | Subscription;

  listeners: { parent: HTMLElement | Window, id: string, callback: () => any }[] = [];

  isMobile = false;

  constructor(
    private charactersService: CharactersService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
  ) { }

  ngAfterViewInit(): void {
    this.#routeSubscription$ = this.route.paramMap.subscribe((data) => {
      const id = data.get('id');
      if (id) this.update(+id);
    });

    const appHeight = () => this.isMobile = window.innerWidth < 600;

    appHeight();
    window.addEventListener('resize', appHeight);

    this.listeners.push({ parent: window, id: 'resize', callback: appHeight });
  }

  update(characterId: number) {
    this.#characterSubscription$?.unsubscribe();
    this.#characterSubscription$ = this.charactersService.find(characterId).subscribe(({ results }) => {
      if (!results.length) {
        this.snackBar.open('Lo sentimos, no hemos encontrado ningún personaje', 'Ok');
        this.router.navigate(['/home']);
        return;
      }

      this.character = results[0];
    });

    this.#comicsSubscription$?.unsubscribe();
    this.#comicsSubscription$ = this.charactersService.comics({ characterId }).subscribe(({ results }) => {
      this.comics = results;
    });
  }

  openDialog(comic: ComicInfo) {
    this.dialog.open(DetailCardComponent, { data: comic, height: this.isMobile ? '95vh' : '70vh', width: this.isMobile ? '95vw' : '60vw', maxWidth: this.isMobile ? '95vw' : '60vw' });
  }

  ngOnDestroy(): void {
    this.listeners.forEach(({ callback, id, parent }) => parent.removeEventListener(id, callback));
    this.#characterSubscription$?.unsubscribe();
    this.#comicsSubscription$?.unsubscribe();
    this.#routeSubscription$?.unsubscribe();
  }

}
