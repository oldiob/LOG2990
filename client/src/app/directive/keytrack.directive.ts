import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: 'div[doc]',
})
export class KeytrackDirective {
  key: string;
  constructor() { }
  @HostListener('document:keypress', ['$event']) // need refactor
  handleKeyboardEvent(event: KeyboardEvent) {
    this.key = event.key;
    alert(1);

  }
}
