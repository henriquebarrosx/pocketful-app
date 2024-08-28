import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

type Option = {
  label: string;
  value: string;
}

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.sass']
})
export class SelectComponent<T> implements ControlValueAccessor {
  value: string = ''
  @Input() options: Option[] = [];
  @Output() focus: EventEmitter<T[]> = new EventEmitter();

  onTouched: () => void = () => { };
  onChange: (value: any) => void = () => { };

  onFocus() {
    this.focus.emit()
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Caso precise desabilitar o select
  }
}