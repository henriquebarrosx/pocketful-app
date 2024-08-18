import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

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
  isAuthenticated$: Observable<boolean>
  signedAccountName: string

  constructor(private sessionService: SessionService) {
    this.isAuthenticated$ = this.sessionService.isAuthenticated
    this.signedAccountName = this.sessionService.get()?.name ?? ''
  }

  logout() {
    this.sessionService.destroy()
  }

  openDialog() {
    this.isDialogVisible = true
  }

  closeDialog() {
    this.isDialogVisible = false
  }
}
