import { Injectable } from '@angular/core';
import { CmdCut } from 'src/services/cmd/cmd.cut';
import { CmdService } from 'src/services/cmd/cmd.service';
import { CmdSVG } from 'src/services/cmd/cmd.svg';
import { SVGAbstract } from 'src/services/svg/element/svg.interface';
import { SVGService } from 'src/services/svg/svg.service';
import { SelectorTool } from 'src/services/tool/tool-options/selector';

@Injectable({
    providedIn: 'root',
})
export class ClipboardService {

    selectedObjects: SVGAbstract[] = [];
    offset: number[] = [0, 0];

    constructor(public selector: SelectorTool, public svg: SVGService) { }

    copy(): void {
        this.selectedObjects = Array.from(this.selector.selected).map((object) => {
            const tmp: SVGAbstract = Object.create(object);
            tmp.element = object.element.cloneNode(true);
            return tmp;
        });
        this.offset = [0, 0];
    }

    cut(): void {
        this.selectedObjects = Array.from(this.selector.selected);
        this.selector.reset();
        this.offset = [0, 0];
        CmdService.execute(new CmdCut(this.selectedObjects));
    }

    paste(): void {
        const toPaste: SVGAbstract[] = this.selectedObjects.map((object) => {
            const tmp: SVGAbstract = Object.create(object);
            tmp.element = object.element.cloneNode(true);
            this.offset = this.selector.nextOffset(this.offset);
            tmp.translate(this.offset[0], this.offset[1]);
            return tmp;
        });
        CmdService.execute(new CmdSVG(toPaste));
    }
}
