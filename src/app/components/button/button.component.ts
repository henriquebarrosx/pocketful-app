import { Component, EventEmitter, Input, Output } from '@angular/core';

type Variant =
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'white'
  | 'blank'

type Size =
  | 'small'
  | 'medium'
  | 'large'

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.sass'],
})
export class ButtonComponent {
  @Input() variant: Variant = 'primary';
  @Input() size: Size = 'medium';
  @Input() type: 'submit' | 'button' = 'button';
  @Output() click: EventEmitter<void> = new EventEmitter<void>();

  emitClickEvent() {
    this.click.emit();
  }
}
