import { Component } from '@angular/core';

import { UserService } from 'src/app/services/app/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    public User: UserService
  ) { }

}