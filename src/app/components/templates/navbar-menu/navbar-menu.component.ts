import { AfterViewInit, Component, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { MatButton } from '@angular/material/button';

import { CharactersService } from 'src/app/services/app/characters.service';
import { UserService } from 'src/app/services/app/user.service';

import { CharacterInfo } from 'src/app/interfaces/marvel/characters.interface';
import { ActivatedRoute } from '@angular/router';

import { HomeComponent } from '../../private/home/home.component';

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
    private route: ActivatedRoute,
    public User: UserService
  ) { }

  ngAfterViewInit(): void {
    this.characterSubscription$ = this.Characters.characters.subscribe(list => {
      this.loadedCharacters = list;
    });

    if (this.route.component?.name === 'HomeComponent') return;
    if (this.Characters.totalLoaded) return;

    this.Characters.replace({ limit: 10 });
  }

  ngOnDestroy(): void {
    this.characterSubscription$?.unsubscribe();
  }

}
