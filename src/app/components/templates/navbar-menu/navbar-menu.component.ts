import { AfterViewInit, Component, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { MatButton } from '@angular/material/button';

import { CharactersService } from 'src/app/services/app/characters.service';
import { UserService } from 'src/app/services/app/user.service';

import { CharacterInfo } from 'src/app/interfaces/marvel/characters.interface';

@Component({
  selector: 'app-navbar-menu',
  templateUrl: './navbar-menu.component.html',
  styleUrls: ['./navbar-menu.component.scss']
})
export class NavbarMenuComponent implements AfterViewInit, OnDestroy {

  @Input({ required: true }) menuBtn!: MatButton;
  @Input() itemSize = '100%';

  characterSubscription$: undefined | Subscription;

  loadedCharacters: CharacterInfo[] = [];

  constructor(
    private Characters: CharactersService,
    public User: UserService
  ) { }

  ngAfterViewInit(): void {
    this.characterSubscription$ = this.Characters.characters.subscribe(list => {
      this.loadedCharacters = list;
    });
  }

  ngOnDestroy(): void {
    this.characterSubscription$?.unsubscribe();
  }

}
