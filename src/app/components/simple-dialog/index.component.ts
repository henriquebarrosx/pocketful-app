import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-simple-dialog',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.sass'],
  standalone: true,
  imports: [CommonModule]
})
export class SimpleDialogComponent {

  @Input() visible: boolean = true
  @Input() position: 'top' | 'bottom' = 'bottom'
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  emitCloseEvent() {
    this.close.emit();
  }
}
