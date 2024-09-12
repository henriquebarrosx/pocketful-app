import { Component } from '@angular/core';

import { AuthService } from '../../services/external/auth/index.service';
import { SessionService } from '../../services/internal/session/index.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass'],
})
export class NavBarComponent {
  isDialogVisible: boolean = false
  isAuthenticated: boolean = false
  sessionName: string = ''

  constructor(
    private sessionService: SessionService,
    private authService: AuthService,
  ) {
    this.sessionService.session.subscribe(session => {
      this.isAuthenticated = !!session
      this.sessionName = session?.name ?? ''
    })
  }

  logout() {
    this.authService.signOut()
      .pipe(finalize(() => this.sessionService.destroy()))
      .subscribe(() => this.closeDialog())
  }

  openDialog() {
    this.isDialogVisible = true
  }

  closeDialog() {
    this.isDialogVisible = false
  }
}
