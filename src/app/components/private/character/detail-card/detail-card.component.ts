import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SharedModule } from 'src/app/components/shared.module';

import { ComicInfo } from 'src/app/interfaces/marvel/comics.interface';

@Component({
  selector: 'app-detail-card',
  templateUrl: './detail-card.component.html',
  styleUrls: ['./detail-card.component.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class DetailCardComponent {

  publishDate: string | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) public comic: ComicInfo
  ) {
    this.publishDate = this.comic.dates.find(({ type }) => type === 'onsaleDate')?.date;
  }

}
