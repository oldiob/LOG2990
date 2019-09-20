import { Component, ComponentFactory, ComponentFactoryResolver, ComponentRef,
   Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { PencilService } from 'src/app/services/pencil.service';
import { GenericStrokeComponent } from '../generic-stroke/generic-stroke.component';
import { WorkZoneService } from './../../services/work-zone.service';


@Component({
    selector: 'app-draw-area',
    templateUrl: './draw-area.component.html',
    styleUrls: ['./draw-area.component.scss'],
})
export class DrawAreaComponent implements OnInit {
    @ViewChild('svgContainer', { static: true, read: ViewContainerRef }) entry: ViewContainerRef;
    @Input() keyEvent: KeyboardEvent;
    @Input() key: string;

    mouseX: number;
    mouseY: number;

    OFFSET = 50;
    componentRef: ComponentRef<any>;
    height: number;
    width: number;
    rectangleWidth: number;
    rectangleHeight: number;
    rectangleActivate = false;
    backgroundColor: string = "#ffffffff";
    currentStyles: { height: number; width: number; 'background-color': string; };
    isMouseDown = false;
    isOnceWhileDown = true;

    constructor(private workZoneService: WorkZoneService, private resolver: ComponentFactoryResolver,
                private pencilService: PencilService) { }

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
        this.mouseX = event.clientX;
        this.mouseY = event.clientY;
        console.log('isMouseInArea ' + this.isMouseInArea);
        if (this.isMouseDown && this.isMouseInArea()) {
          console.log('add points');
          this.componentRef.instance.addPoints(this.mouseX, this.mouseY);
        }
    }

    onClick(event: MouseEvent): void {
      this.mouseX = event.clientX;
      this.mouseY = event.clientY;

    }
    onMouseDown(event: MouseEvent): void {
      if (this.isOnceWhileDown && this.isMouseInArea()) {
        this.createComponent('danger');
        this.isOnceWhileDown = false;
      }
      this.isMouseDown = true;
    }
    onMouseUp(event: MouseEvent): void {
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
        return false;
      }
    }

    createComponent(type: any) {
      const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(GenericStrokeComponent);

      this.componentRef = this.entry.createComponent(factory);
      this.componentRef.instance.type = type;
      this.componentRef.instance.id = this.pencilService.assignID();
      this.componentRef.instance.setViewBoxSetting();
      this.componentRef.instance.iniPoints(this.mouseX, this.mouseY);
      //this.componentRef.instance.iniPoints(this.mouseX, this.mouseY);
      //this.componentRef.instance.output.subscribe((event: any) => console.log(event));
    }
    ngOnDestroy() {
      this.componentRef.destroy();
    }
}
