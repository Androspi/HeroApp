import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.scss']
})
export class SearcherComponent implements OnDestroy {

  #searchInterval = 0;

  constructor(
    private router: Router,
  ) { }

  search = (event: HTMLInputElement) => {
    clearInterval(this.#searchInterval);
    this.#searchInterval = window.setTimeout(() => {
      this.router.navigate([`/home`], { queryParams: { find: event.value || undefined } });
    }, 1e3);
  }

  ngOnDestroy(): void {
    clearInterval(this.#searchInterval);
  }

}
