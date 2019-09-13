// import { HostListener } from '@angular/core';

// export class RectangleService {
//     selectRect: EventTarget;
//     currentX: number;
//     currentY: number;

//     constructor() {
//         this.selectRect = new EventTarget();
//     }

//     @HostListener('window: mousedown', ['$event'])
//     startDragMouse(event: MouseEvent): void {
//         if(event.target.)
//         this.currentX = event.clientX;
//         this.currentY = event.clientY;
//         this.selectRect = event.target;
//         event.preventDefault();
//     }

//     @HostListener('window: mousemove', ['$event'])
//     dragMouse(event: MouseEvent): void {
//         if (this.selectRect) {
//             const x: number = this.selectRect.getAttribute('x') + event.clientX - this.currentX;
//             const y: number = this.selectRect.getAttribute('y') + event.clientY - this.currentY;
//             this.currentX = event.clientX;
//             this.currentY = event.clientY;
//         }
//     }
//     @HostListener('window: mouseleave', ['$event'])
//     endDragMouse(event: MouseEvent): void {
//         this.selectRect = null;
//     }

//     squareCtrl(event: KeyboardEvent): void {
//         if (event.ctrlKey) {

//         }
//     }
// }
