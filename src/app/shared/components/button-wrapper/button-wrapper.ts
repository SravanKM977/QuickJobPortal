import { Component, Input, input, output } from '@angular/core';

@Component({
  selector: 'app-button-wrapper',
  imports: [],
  templateUrl: './button-wrapper.html',
  styleUrl: './button-wrapper.css',
})
export class ButtonWrapper {
  @Input() mode = '';
  cancel = output<any>();

  onCancel(event: Event) {
    this.cancel.emit(event);
  }
}
