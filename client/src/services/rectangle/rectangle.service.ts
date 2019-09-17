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
=======
// //import {palette.services.ts} from '../palette';


// enum DashArrayType{
//     line=1,
//     dots,
//     dashes,
//     dotsAndDashes,
// }

// enum TraceType{
//     onlyOutline=1,
//     onlyFilling,
//     fillingAndOutline,
// }

// export class Rectangle{
//     public static NORMAL_LINE: string = "";
//     public static DOTTED_LINE: string = "5,5";
//     public static DASHED_LINE: string = "10,10";
//     public static DOTTED_AND_DASHED_LINE: string = "20,10,5,5,5,10";

//     lenghtDrawArea: number;
//     heightDrawArea: number;

//     traceType:TraceType;
//     outlineStrokeWidth: number;
//     outlineStrokeDashArray: DashArrayType; 
//     widthRectangle: number;
//     heightRectangle: number;
//     square: boolean;

//     initialX: number;
//     initialY: number;

//     mouseX: number;
//     mouseY: number;
    
//     LeftX:number;
//     upperY:number;

//     RightX:number;
//     lowerY:number;

//     widthX: number;
//     heightY:number;
    
//     //colorPalette: ColorPalette;


//     constructor(outlineStrokeWidth:number, outlineStrokeDashArray:DashArrayType){
//         this.outlineStrokeWidth=outlineStrokeWidth;
//         this.outlineStrokeDashArray=outlineStrokeDashArray;

//         //feed the draw area height and width that depends on the set drawn area

//     }


//     SetTraceType(choosenTraceType:TraceType) {
//         this.traceType=choosenTraceType;
//     }

//     SetOutlineWidth(choosenOutlineWidth:number){
//         this.outlineStrokeWidth=choosenOutlineWidth;
//     }



//     MouseIsPressed(): boolean {
//         //if mouse is pressed return true
//         return true;
//     }

//     ShiftIsPressed(): boolean{
//         //if shift is pressed return true
//         return true;
//     }



//     feedRectangleParameters(){

//         //feed colours first (don't forget both opacity)
//         //feed outline width

//         switch(this.traceType) { 
//             case 1: { 
//                //feed the opacity of the filling with 0
//                break; 
//             } 
//             case 2: { 
//                //feed the opacity of the outline with 0
//                break; 
//             } 
//             case 3: { 
//                 //Don't touch the opacities 
//                 break; 
//              } 
//             default: { 
//                //feed the opacity of the filling with 0
//                break; 
//             } 
//          }

//          switch(this.outlineStrokeDashArray) { 
//             case 1: { 
//                //feed the stroke-dashArray with NORMAL_LINE 
//                break; 
//             } 
//             case 2: { 
//                //feed the stroke-dashArray with DOTTED_LINE
//                break; 
//             } 
//             case 3: { 
//                 //feed the stroke-dashArray with DASHED_LINE
//                 break; 
//              } 
//              case 4: { 
//                 //feed the stroke-dashArray with DOTTED_AND_DASHED_LINE
//                 break; 
//              } 
//             default: { 
//                //feed the stroke-dashArray with NORMAL_LINE
//                break; 
//             } 
//          }

        
//     }

//     initialX: number;
//     initialY: number;

//     mouseX: number;
//     mouseY: number;
    
//     LeftX:number;
//     upperY:number;

//     RightX:number;
//     lowerY:number;

//     widthX: number;
//     heightY:number;

//     drawRectangle(){
//         this.feedRectangleParameters();

//         while(this.MouseIsPressed()){
            
//             //get values of inital x, inital y, and the x and y where mouse is currently located 


//             //calculate the width & height of square + adequate placing that considers the position of the mouse
//             //compared to the initial first place where the mouse was clicked
//             this.widthX=this.mouseX-this.initialX;
//             this.heightY=this.mouseY-this.initialY;
            
            
//             if (this.widthX>=0) { 
//                 this.LeftX= this.initialX;
//                 this.RightX= this.mouseX;
//                 this.widthRectangle=this.RightX-this.LeftX;
                 
//             }else if(this.widthX<0) { 
//                 this.LeftX= this.mouseX;
//                 this.RightX= this.initialX;
//                 this.widthRectangle=this.RightX-this.LeftX;
                   
//             } 
                
             

              
//             if(this.heightY>=0){ 
//                 this.upperY= this.initialY;
//                 this.lowerY= this.mouseY;
//                 this.widthRectangle=this.lowerY-this.upperY;
                   
//             } else if(this.heightY<0) { 
//                 this.upperY= this.mouseY;
//                 this.lowerY= this.initialY;
//                 this.widthRectangle=this.lowerY-this.upperY;
                   
//             } 
                
 
//             if(this.ShiftIsPressed()){
//                 this.widthRectangle = this.heightRectangle;

//             }

//             //feed heightRectangle and widthRectangle into html
//         }

//     }
>>>>>>> Delete Unused Import

    pressShift(): void {
        if (this. width >= this.height) {
            this.width = this.height;
        } else {
        this.height = this.width;
        }
    }

<<<<<<< HEAD
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
=======

// }
>>>>>>> Delete Unused Import
