import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: 'div[mousetrack]'
})
export class MousetrackDirective {
  @HostListener('mouseenter') onMouseEnter() {
    console.log('entered area');
  }
  @HostListener('mouseexit') onMouseExit() {
    console.log('exited area');
  }
  @HostListener('click', ['$event.target']) onClick() {
    console.log('click');
 }
}
