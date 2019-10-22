import { ElementRef, Injectable } from '@angular/core';
import { SVGInterface } from 'src/services/svg/element/svg.interface';
import { DOMRenderer } from '../../utils/dom-renderer';
import { Rect } from 'src/utils/geo-primitives';

@Injectable({
    providedIn: 'root',
})
export class SVGService {
    entry: ElementRef;

    objects: SVGInterface[] = [];

    constructor() {
        //
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
        DOMRenderer.appendChild(this.entry.nativeElement, obj.element);
    }

    removeObject(): SVGInterface | null {
        const removedObject: SVGInterface | undefined = this.objects.pop();
        if (removedObject !== undefined) {
            DOMRenderer.removeChild(this.entry.nativeElement, removedObject.element);
            return removedObject;
        }
        return null;
    }

    addElement(element: any) {
        DOMRenderer.appendChild(this.entry.nativeElement, element);
    }

    removeElement(element: any) {
        DOMRenderer.removeChild(this.entry.nativeElement, element);
    }

    clearDrawArea() {
        const ref = this.entry.nativeElement;
        while (ref.hasChildNodes()) {
            ref.removeChild(ref.firstChild);
        }

        DOMRenderer.appendChild(this.entry.nativeElement, this.createBlurFilter());
        DOMRenderer.appendChild(this.entry.nativeElement, this.createOpacityFilter());
        DOMRenderer.appendChild(this.entry.nativeElement, this.createTurbulenceFilter());
    }

    private createBlurFilter() {
        const renderer = DOMRenderer;
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
        const renderer = DOMRenderer;
        const filterOpacity = renderer.createElement('filter', 'svg');
        renderer.setAttribute(filterOpacity, 'id', 'opacity');
        renderer.setAttribute(filterOpacity, 'x', '-20');
        renderer.setAttribute(filterOpacity, 'width', '200');
        renderer.setAttribute(filterOpacity, 'y', '-20');
        renderer.setAttribute(filterOpacity, 'height', '200');
        const filterContent = renderer.createElement('feComponentTransfer', 'svg');

        const filterSubContent = renderer.createElement('feFuncA', 'svg');
        renderer.setAttribute(filterSubContent, 'type', 'table');
        renderer.setAttribute(filterSubContent, 'tableValues', '0 0.5');
        renderer.appendChild(filterContent, filterSubContent);

        renderer.appendChild(filterOpacity, filterContent);

        return filterOpacity;
    }
    private createTurbulenceFilter() {
        const renderer = DOMRenderer;
        const filterTurbulence = renderer.createElement('filter', 'svg');
        renderer.setAttribute(filterTurbulence, 'id', 'turbulence');

        const filterContent = renderer.createElement('feTurbulence', 'svg');
        renderer.setAttribute(filterContent, 'type', 'turbulence');
        renderer.setAttribute(filterContent, 'baseFrequency', '0.05');
        renderer.setAttribute(filterContent, 'numOctaves', '2');
        renderer.setAttribute(filterContent, 'result', 'turbulence');

        const filterSubContent = renderer.createElement('feDisplacementMap', 'svg');
        renderer.setAttribute(filterSubContent, 'in2', 'turbulence');
        renderer.setAttribute(filterSubContent, 'in', 'SourceGraphic');
        renderer.setAttribute(filterSubContent, 'scale', '50');
        renderer.setAttribute(filterSubContent, 'xChannelSelector', 'R');
        renderer.setAttribute(filterSubContent, 'yChannelSelector', 'G');

        renderer.appendChild(filterTurbulence, filterContent);
        renderer.appendChild(filterTurbulence, filterSubContent);

        return filterTurbulence;
    }

    getInRect(rect: Rect): Set<SVGInterface> {
        let matches: Set<SVGInterface> = new Set<SVGInterface>([]);
        this.objects.forEach((obj) => {
            const box: any = obj.element.getBBox();
            if (rect.intersect(new Rect(box.x, box.y, box.x + box.width, box.y + box.height))) {
                matches.add(obj);
            }
        });
        return matches;
    }
}
