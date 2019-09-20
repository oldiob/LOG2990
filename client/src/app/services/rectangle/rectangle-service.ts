import { HostListener } from '@angular/core';
import { Rectangle } from '../../../../../common/communication/rectangle';
export class RectangleService {
    currentX = 0;
    currentY = 0;
    mouseX = 0;
    mouseY = 0;
    width = 0;
    height = 0;
    click: boolean;
    rectangles: Rectangle[];
    rectangle: Rectangle;
    constructor() {
        this.click = false;
        this.rectangles = [];
    }

    @HostListener('window: mousedown', ['$event'])
    startDrawRect(event: MouseEvent): void {
        this.mouseX = event.offsetX;
        this.mouseY = event.offsetY;
        this.currentX = this.mouseX;
        this.currentY = this.mouseY;
        this.click = true;
    }
    @HostListener('mousemove', ['$event'])
    drawRect(event: MouseEvent): void {
        this.width = (Math.abs(this.currentX - event.offsetX));
        this.height = (Math.abs(this.currentY - event.offsetY));
}

    @HostListener('window: mouseleave', ['$event'])
    @HostListener('window: mouseup', ['$event'])
    endDragMouse(event: MouseEvent): void {
        if (!this.click) {
            this.addRectangle();
            this.click = false;
        }
    }

    @HostListener('window: keydown', ['$event'])
    squareShift(event: KeyboardEvent): void {
        if (event.shiftKey) {
            this.width = this.height;
            this.height = this.width;
        }
    }

    addRectangle(): void {
        this.rectangle = {
            pointX: this.currentX,
            pointY: this.currentY,
            width: this.width,
            height: this.height,
        };
        this.rectangles.push(this.rectangle);
        console.log(this.rectangles);
    }
}
