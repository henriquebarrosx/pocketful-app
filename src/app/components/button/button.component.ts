import { Component, EventEmitter, Input, Output } from '@angular/core';

type Variant =
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'white'
  | 'blank'

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.sass']
})
export class ButtonComponent {
  @Input() variant: Variant = 'primary';
  @Output() click: EventEmitter<void> = new EventEmitter<void>();

  emitClickEvent() {
    this.click.emit();
  }
}
