import { Injectable } from '@angular/core';

import { SVGInterface } from 'src/app/services/svg/svg.interface'
import { ToolService } from 'src/app/services/tool/tool.service';

@Injectable({
    providedIn: 'root',
})
export class SVGService {

    private objects: SVGInterface[];

    width: number;
    height: number;

    constructor(public toolService: ToolService) {
    }

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
    onPressed(event: MouseEvent): SVGInterface | null {
        return this.toolService.getCurrentTool().onPressed(event);
    }
    onMotion(event: MouseEvent) {
      // TODO - Implement this
    }
    onReleased(event: MouseEvent) {
      // TODO - Implement this
    }
}

