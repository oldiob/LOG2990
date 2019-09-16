import { Component, ComponentFactory, ComponentFactoryResolver, ComponentRef,
   Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { WorkZoneService } from './../../services/work-zone.service';
import { GenericStrokeComponent } from '../generic-stroke/generic-stroke.component';

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

    componentRef: ComponentRef<any>;
    height: number;
    width: number;
    rectangleWidth: number;
    rectangleHeight: number;
    rectangleActivate = false;
    backgroundColor: string = "#ffffffff";
    currentStyles: { height: number; width: number; 'background-color': string; };

    constructor(private workZoneService: WorkZoneService, private resolver: ComponentFactoryResolver) { }

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
        this.mouseX = event.offsetX;
        this.mouseY = event.offsetY;
    }

    onClick(event: MouseEvent): void {
        this.mouseX = event.clientX;
        this.mouseY = event.clientY;
        this.createComponent('danger');
    }

    createComponent(type: any) {
      const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(GenericStrokeComponent);

      this.componentRef = this.entry.createComponent(factory);

      this.componentRef.instance.type = type;

      this.componentRef.instance.backgroundColor = 'black';
      this.componentRef.instance.style.left = this.mouseX + 'px';


      //this.componentRef.instance.output.subscribe((event: any) => console.log(event));

    }
    ngOnDestroy() {
      this.componentRef.destroy();
    }
}
