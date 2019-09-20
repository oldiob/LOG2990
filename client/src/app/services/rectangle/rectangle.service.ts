import { HostListener } from '@angular/core';
import { Rectangle } from '../../../../../common/communication/rectangle';


export class RectangleService {
    currentX = 0;
    currentY = 0;
    mouseX = 0;
    mouseY = 0;
    width = 0;
    height = 0;
    i = 0;
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
        if (this.click) {
        this.width = this.mouseX - event.offsetX;
        this.height = this.mouseY - event.offsetY;
        
      

            if (this.width>=0) { 
                this.currentX= event.offsetX;
                this.width = (Math.abs(this.mouseX - event.offsetX));
            } 
            else if (this.width<0) {
                this.currentX=this.mouseX;
                this.width = (Math.abs(this.mouseX - event.offsetX));
            }     
  
            if(this.height>=0){
                this.currentY=event.offsetY;
                this.height = (Math.abs(this.mouseY - event.offsetY));
            }
            else if(this.height<0){
                this.currentY=this.mouseY;
                this.height = (Math.abs(this.mouseY - event.offsetY));
            }       
             
        }
}

    @HostListener('window: mouseleave', ['$event'])
    @HostListener('window: mouseup', ['$event'])
    endDragMouse(event: MouseEvent): void {
            this.addRectangle();
            this.click = false;
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
        // tslint:disable-next-line:forin
        for (const rect in this.rectangles) {
            console.log('RECT', this.rectangles[rect]);
            }
        }
}
