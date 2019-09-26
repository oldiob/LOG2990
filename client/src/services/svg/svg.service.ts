import { ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { SVGInterface } from 'src/services/svg/svg.interface';

@Injectable({
    providedIn: 'root',
})
export class SVGService {

    entry: ViewContainerRef;
    componentRef: ComponentRef<any>;
    private objects: SVGInterface[] = [];
    constructor() { }

    findAt(x: number, y: number): SVGInterface | null {
        for (let i = this.objects.length - 1; i > 0; --i) {
            if (this.objects[i].isAt(x, y)) {
                return this.objects[i];
            }
        }
        return null;
    }
    findIn(x: number, y: number, r: number): SVGInterface | null {
        for (let i = this.objects.length - 1; i > 0; --i) {
            if (this.objects[i].isIn(x, y, r)) {
                return this.objects[i];
            }
        }
        return null;
    }
    addObj(obj: SVGInterface) {
        this.objects.push(obj);
    }
    rmObj() {
        this.objects.pop();
    }
}
