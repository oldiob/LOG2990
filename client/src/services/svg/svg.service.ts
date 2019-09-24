import { Injectable } from '@angular/core';
import { SVGInterface } from 'src/services/svg/svg.interface';
import { ITool } from 'src/services/tool/tool-options/i-tool';

@Injectable({
    providedIn: 'root',
})
export class SVGService {

    private objects: SVGInterface[] = [];
    private currentTool: ITool;
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

    get tool(): ITool { return this.currentTool; }
    set tool(tool: ITool) { this.currentTool = tool; }
}
