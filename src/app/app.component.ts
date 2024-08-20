import { Component } from '@angular/core';

import { SessionService } from './shared/services/internal/session/index.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  isAuthenticated: boolean = false

  constructor(private sessionService: SessionService) {
    this.sessionService.session.subscribe(session => {
      this.isAuthenticated = !!session
    })
  }
}
