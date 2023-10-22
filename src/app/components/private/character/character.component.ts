import { Component } from '@angular/core';

import { SharedModule } from '../../shared.module';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class CharacterComponent {

}
