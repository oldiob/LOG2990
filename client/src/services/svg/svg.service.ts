import { Injectable, ElementRef } from '@angular/core';
import { SVGInterface } from 'src/services/svg/element/svg.interface';
import { PaletteService } from '../palette/palette.service';
import { RendererProviderService } from '../renderer-provider/renderer-provider.service';

@Injectable({
    providedIn: 'root',
})
export class SVGService {
    entry: ElementRef;

    private objects: SVGInterface[] = [];
    constructor(private rendererProvider: RendererProviderService, private paletteService: PaletteService) {

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

        obj.setPrimary(this.paletteService.getPrimary());
        obj.setSecondary(this.paletteService.getSecondary());

        this.objects.push(obj);
        this.rendererProvider.renderer.appendChild(this.entry.nativeElement, obj.element);
    }

    removeObject() {
        const removedObject: SVGInterface | undefined = this.objects.pop();
        if (removedObject !== undefined) {
            this.rendererProvider.renderer.removeChild(this.entry.nativeElement, removedObject.element);
        }
    }
}
