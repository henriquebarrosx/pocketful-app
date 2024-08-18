import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { AuthService } from '../../services/external/auth/index.service';
import { SessionService } from '../../services/internal/session/index.service';
import { ButtonComponent } from '../button/button.component';
import { SimpleDialogComponent } from '../simple-dialog/index.component';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.sass'],
  standalone: true,
  imports: [CommonModule, ButtonComponent, SimpleDialogComponent]
})
export class HeaderBarComponent {
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
    this.authService.signOut().subscribe({
      next: () => {
        this.closeDialog()
        this.sessionService.destroy()
      }
    })
  }

  openDialog() {
    this.isDialogVisible = true
  }

  closeDialog() {
    this.isDialogVisible = false
  }
}
