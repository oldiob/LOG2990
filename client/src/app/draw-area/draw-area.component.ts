import { Component,
   Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { PencilService } from 'src/services/pencil/pencil.service';
import { WorkZoneService } from 'src/services/work-zone/work-zone.service';
import { GenericStrokeComponent } from '../generic-stroke/generic-stroke.component';
import { SVGInterface } from 'src/services/svg/element/svg.interface';

@Component({
    selector: 'app-draw-area',
    templateUrl: './draw-area.component.html',
    styleUrls: ['./draw-area.component.scss'],
})
export class DrawAreaComponent implements OnInit {
    @ViewChild('svgContainer', { static: true, read: ViewContainerRef }) entry: ViewContainerRef;
    @Input() keyEvent: KeyboardEvent;
    @Input() key: string;

    currentSVG: SVGInterface | null;
    svgElements: string[];

    mouseX: number;
    mouseY: number;

    OFFSET = 50;

    height: number;
    width: number;

    rectangleWidth: number;
    rectangleHeight: number;
    rectangleActivate = false;
    backgroundColor: string = "#ffffffff";
    currentStyles: { height: number; width: number; 'background-color': string; };
    isMouseDown = false;
    isOnceWhileDown = true;

    constructor(private workZoneService: WorkZoneService, private sanitizer: DomSanitizer) { 
      this.svgElements = [];
    }

    ngOnInit() {
        // Subscribes to WorkZoneService observables
        this.workZoneService.currentWidth.subscribe(
            (width: number) => this.width = width
        );
        this.workZoneService.currentHeight.subscribe(
            (height): number => this.height = height
        );
        this.workZoneService.currentBackgroundColor.subscribe(
            (backgroundColor: string) => this.backgroundColor = backgroundColor
        );
    }
    setCurrentStyles() {
        return {
            height: `${this.height}px`,
            width: `${this.width}px`,
            'background-color': `${this.backgroundColor}`,
        };
    }
    coordinates(event: MouseEvent): void {
        this.mouseX = event.clientX - this.OFFSET;
        this.mouseY = event.clientY;

        if (this.currentSVG != null && this.isMouseDown && this.isMouseInArea()) {
          this.currentSVG.addPoint(this.mouseX, this.mouseY);
        }
    }

    onClick(event: MouseEvent): void {
     

    }
    onMouseDown(event: MouseEvent): void {
      if (this.isOnceWhileDown && this.isMouseInArea()) {
        this.isOnceWhileDown = false;
        this.currentSVG = new SVGPencil();
        this.currentSVG.addPoint(this.mouseX, this.mouseX);
      }
      this.isMouseDown = true;
    }
    onMouseUp(event: MouseEvent): void {
      if (this.currentSVG != null) {
        this.svgElements.push(this.currentSVG.toString());
        this.currentSVG = null;
      }
      this.isMouseDown = false;
      this.isOnceWhileDown = true;
    }
    onMouseEnter(event: MouseEvent): void {
      //
    }
    onMouseLeave(event: MouseEvent): void {
      //
    }
    onDrag(event: MouseEvent): void {
      //
    }
    isMouseInArea(): boolean {
      if (this.mouseX < this.width + this.OFFSET && this.mouseX >= this.OFFSET && this.mouseY >= 0 && this.mouseY < this.height) {
        return true;
      } else {
        this.isMouseDown = false;
        return false;
      }
    }


    getSVG(): SafeHtml {
      let res: string = "";
      
      for (let i = 0; i < this.svgElements.length; i++) {
        res += this.svgElements[i];
      }

      if (this.currentSVG != null) {
        res += this.currentSVG.toString();
      }

      return this.sanitizer.bypassSecurityTrustHtml(res);
    }
}
