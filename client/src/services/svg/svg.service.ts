import { Injectable, Renderer2, ViewContainerRef } from '@angular/core';
import { SVGInterface } from 'src/services/svg/element/svg.interface';
import { PaletteService } from '../palette/palette.service';

@Injectable({
    providedIn: 'root',
})
export class SVGService {
    entry: ViewContainerRef;

    private objects: SVGInterface[] = [];
    constructor(private renderer: Renderer2, private paletteService: PaletteService) { }

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

        obj.setPrimary(this.paletteService.getPrimary());
        obj.setSecondary(this.paletteService.getSecondary());

        this.objects.push(obj);
        this.renderer.appendChild(this.entry, obj);
    }

    removeObject() {
        const removedObject: SVGInterface | undefined = this.objects.pop();
        this.renderer.removeChild(this.entry, removedObject);
    }
}
