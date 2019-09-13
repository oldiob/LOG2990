<<<<<<< HEAD
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
=======
//import {palette.services.ts} from '../palette';


enum DashArrayType{
    line=1,
    dots,
    dashes,
    dotsAndDashes,
}

enum TraceType{
    onlyOutline=1,
    onlyFilling,
    fillingAndOutline,
}

export class Rectangle{
    public static NORMAL_LINE: string = "";
    public static DOTTED_LINE: string = "5,5";
    public static DASHED_LINE: string = "10,10";
    public static DOTTED_AND_DASHED_LINE: string = "20,10,5,5,5,10";

    lenghtDrawArea: number;
    heightDrawArea: number;

    traceType:TraceType;
    outlineStrokeWidth: number;
    outlineStrokeDashArray: DashArrayType; 
    widthRectangle: number;
    heightRectangle: number;
    square: boolean;

    initialX: number;
    initialY: number;

    mouseX: number;
    mouseY: number;
    
    LeftX:number;
    upperY:number;

    RightX:number;
    lowerY:number;

    widthX: number;
    heightY:number;
    
    //colorPalette: ColorPalette;


    constructor(outlineStrokeWidth:number, outlineStrokeDashArray:DashArrayType){
        this.outlineStrokeWidth=outlineStrokeWidth;
        this.outlineStrokeDashArray=outlineStrokeDashArray;

        //feed the draw area height and width that depends on the set drawn area

    }


    SetTraceType(choosenTraceType:TraceType) {
        this.traceType=choosenTraceType;
>>>>>>> Put the line 1 as a comment in rectangle.service.ts
    }


    activeRectangle(): void {
        // 
    }

    @HostListener('window: mousedown', ['$event'])

    startDrawRect(event: MouseEvent): void {
        this.mouseX = event.offsetX;
        this.mouseY = event.offsetY;
        this.currentX = this.mouseX;
        this.currentY = this.mouseY;
        this.click = true;
    }

    drawRect(event: MouseEvent): void {
        if (this.click) {
        this.width = (Math.abs(this.currentX - event.offsetX));
        this.height = (Math.abs(this.currentY - event.offsetY));
        }
        if (this.click && event.shiftKey) {
        this.pressShift();
        }
    }

    endDragMouse(): void {
            this.addRectangle();
            this.click = false;
    }

    pressShift(): void {
        if (this. width >= this.height) {
            this.width = this.height;
        } else {
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
    }
}
