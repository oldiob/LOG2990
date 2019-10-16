import { ElementRef, Injectable, Renderer2 } from '@angular/core';
import { SVGInterface } from 'src/services/svg/element/svg.interface';
import { RendererProviderService } from '../renderer-provider/renderer-provider.service';

@Injectable({
    providedIn: 'root',
})
export class SVGService {
    entry: ElementRef;

    objects: SVGInterface[] = [];
    renderer: Renderer2;

    constructor(rendererProvider: RendererProviderService) {
        this.renderer = rendererProvider.renderer;
    }

    findAt(x: number, y: number): SVGInterface | null {
        for (let i = this.objects.length - 1; i >= 0; --i) {
            if (this.objects[i].isAt(x, y)) {
                return this.objects[i];
            }
        }
        return null;
    }

    findIn(x: number, y: number, r: number): SVGInterface | null {
        for (let i = this.objects.length - 1; i >= 0; --i) {
            if (this.objects[i].isIn(x, y, r)) {
                return this.objects[i];
            }
        }
        return null;
    }

    addObject(obj: SVGInterface | null) {
        if (obj == null) {
            return;
        }

        this.objects.push(obj);
        this.renderer.appendChild(this.entry.nativeElement, obj.element);
    }

    removeObject(): SVGInterface | null {
        const removedObject: SVGInterface | undefined = this.objects.pop();
        if (removedObject !== undefined) {
            this.renderer.removeChild(this.entry.nativeElement, removedObject.element);
            return removedObject;
        }
        return null;
    }

    clearDrawArea() {
        const ref = this.entry.nativeElement;
        while (ref.hasChildNodes()) {
            ref.removeChild(ref.firstChild);
        }

        this.renderer.appendChild(this.entry.nativeElement, this.createBlurFilter());
        this.renderer.appendChild(this.entry.nativeElement, this.createOpacityFilter());
        this.renderer.appendChild(this.entry.nativeElement, this.createTurbulenceFilter());
    }

    private createBlurFilter() {
        const renderer = this.renderer;
        const filterBlur = renderer.createElement('filter', 'svg');
        renderer.setAttribute(filterBlur, 'id', 'blur');
        renderer.setAttribute(filterBlur, 'x', '-20');
        renderer.setAttribute(filterBlur, 'width', '200');
        renderer.setAttribute(filterBlur, 'y', '-20');
        renderer.setAttribute(filterBlur, 'height', '200');
        const filterBlurContent = renderer.createElement('feGaussianBlur', 'svg');
        renderer.setAttribute(filterBlurContent, 'stdDeviation', '4');
        renderer.appendChild(filterBlur, filterBlurContent);

        return filterBlur;
    }
    private createOpacityFilter() {
        const renderer = this.renderer;
        const filterBlur = renderer.createElement('filter', 'svg');
        renderer.setAttribute(filterBlur, 'id', 'opacity');
        renderer.setAttribute(filterBlur, 'x', '-20');
        renderer.setAttribute(filterBlur, 'width', '200');
        renderer.setAttribute(filterBlur, 'y', '-20');
        renderer.setAttribute(filterBlur, 'height', '200');
        const filterBlurContent = renderer.createElement('feComponentTransfer', 'svg');

        const filterSubContent = renderer.createElement('feFuncA', 'svg');
        renderer.setAttribute(filterSubContent, 'type', 'table');
        renderer.setAttribute(filterSubContent, 'tableValues', '0 0.5');
        renderer.appendChild(filterBlurContent, filterSubContent);

        renderer.appendChild(filterBlur, filterBlurContent);

        return filterBlur;
  }
    private createTurbulenceFilter() {
        const renderer = this.renderer;
        const filterBlur = renderer.createElement('filter', 'svg');
        renderer.setAttribute(filterBlur, 'id', 'turbulence');

        const filterBlurContent = renderer.createElement('feTurbulence', 'svg');
        renderer.setAttribute(filterBlurContent, 'type', 'turbulence');
        renderer.setAttribute(filterBlurContent, 'baseFrequency', '0.05');
        renderer.setAttribute(filterBlurContent, 'numOctaves', '2');
        renderer.setAttribute(filterBlurContent, 'result', 'turbulence');

        const filterSubContent = renderer.createElement('feDisplacementMap', 'svg');
        renderer.setAttribute(filterSubContent, 'in2', 'turbulence');
        renderer.setAttribute(filterSubContent, 'in', 'SourceGraphic');
        renderer.setAttribute(filterSubContent, 'scale', '50');
        renderer.setAttribute(filterSubContent, 'xChannelSelector', 'R');
        renderer.setAttribute(filterSubContent, 'yChannelSelector', 'G');

        renderer.appendChild(filterBlur, filterBlurContent);
        renderer.appendChild(filterBlur, filterSubContent);

        return filterBlur;
    }
}
