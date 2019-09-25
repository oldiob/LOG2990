import { Rectangle } from '../../../../common/communication/rectangle';

enum TraceType{
    strokeOnly=0,
    fillOnly,
    strokeAndFill,
}
export class RectangleService {
    currentX = 0;
    currentY = 0;
    mouseX = 0;
    mouseY = 0;
    width = 0;
    height = 0;
    pointSize = 1;
    strokeOpacity = 1;
    fillOpacity = 1;
    traceType: TraceType;
    click: boolean;
    rectangles: Rectangle[];
    rectangle: Rectangle;
    constructor() {
        this.click = false;
        this.rectangles = [];
    }

    SelectPointSize(pointSize:number){
        if (pointSize<=0){
            this.pointSize=1;
        }else
        this.pointSize=pointSize;
    }

    GetPointSize(): string{
        return this.pointSize.toString();
    }

    SelectStrokeOpacity(strokeOpacity:number){
        if (strokeOpacity<0){
            this.strokeOpacity=1;
        } else
        this.strokeOpacity=strokeOpacity;
    }

    GetStrokeOpacity(): string{
        return this.strokeOpacity.toString();
    }

    SelectFillOpacity(fillOpacity:number){
        if (fillOpacity<0){
            this.fillOpacity=1;
        } else
        this.fillOpacity=fillOpacity;
    }

    GetFillOpacity(): string{
        return this.fillOpacity.toString();
    }

    SelectTraceType(traceType:number){
        if (traceType==0){
            this.traceType=0;
            this.SelectFillOpacity(0);
        } else if (traceType==1){
            this.traceType=1;
            this.SelectStrokeOpacity(0);
        }else if(traceType==2){
            this.traceType=2;
        } else {
            this.traceType=0;
            this.SelectFillOpacity(0);
        }
    }


    startDrawRect(event: MouseEvent): void {
        this.mouseX = event.offsetX;
        this.mouseY = event.offsetY;
        this.currentX = this.mouseX;
        this.currentY = this.mouseY;
        this.click = true;
    }

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
