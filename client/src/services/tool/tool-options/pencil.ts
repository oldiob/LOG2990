import { ComponentFactory, ComponentFactoryResolver } from '@angular/core';
import { GenericStrokeComponent } from 'src/app/generic-stroke/generic-stroke.component';
import { SVGService } from 'src/services/svg/svg.service';
import { ITool } from './i-tool';

export class Pencil implements ITool {
  FILENAME: string = "pencil.png";

  constructor(private resolver: ComponentFactoryResolver, private svgservice: SVGService) { //
  }

  onPressed(event: MouseEvent): import('../../svg/svg.interface').SVGInterface | null {
    this.createComponent('test', event.clientX, event.clientY);
    return null;
  }
  onMotion(event: MouseEvent): void {
    this.svgservice.componentRef.instance.addPoints(event.clientX, event.clientY);
  }
  onReleased(event: MouseEvent): void {
    throw new Error('Method not implemented.');
  }

  leftClick() {
    throw new Error('Method not implemented.');
  }
  leftRelease() {
    throw new Error('Method not implemented.');
  }

  createComponent(type: any, mouseX: number, mouseY: number) {
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(GenericStrokeComponent);

    this.svgservice.componentRef = this.svgservice.entry.createComponent(factory);
    this.svgservice.componentRef.instance.type = type;
    this.svgservice.componentRef.instance.setViewBoxSetting();
    this.svgservice.componentRef.instance.iniPoints(mouseX, mouseY);
  }

}
