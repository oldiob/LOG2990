import { Injectable } from '@angular/core';
import { CmdCut } from 'src/services/cmd/cmd.cut';
import { CmdService } from 'src/services/cmd/cmd.service';
import { CmdSVG } from 'src/services/cmd/cmd.svg';
import { SVGInterface } from 'src/services/svg/element/svg.interface';
import { SVGService } from 'src/services/svg/svg.service';
import { SelectorTool } from 'src/services/tool/tool-options/selector';

@Injectable({
    providedIn: 'root',
})
export class ClipboardService {

    static OFFSET = 30;

    obj: SVGInterface[] = [];
    offset = 0;

    constructor(public selector: SelectorTool, public svg: SVGService) { }

    copy(): void {
        this.obj = Array.from(this.selector.selected).map((obj) => {
            const tmp: SVGInterface = Object.create(obj);
            tmp.element = obj.element.cloneNode(true);
            return tmp;
        });
        this.offset = 0;
    }

    cut(): void {
        this.obj = Array.from(this.selector.selected);
        this.selector.reset();
        this.offset = 0;
        CmdService.execute(new CmdCut(this.obj));
    }

    paste(): void {
        this.offset += ClipboardService.OFFSET;
        const toPaste: SVGInterface[] = this.obj.map((obj) => {
            const tmp: SVGInterface = Object.create(obj);
            tmp.element = obj.element.cloneNode(true);
            if (tmp.move) {
                tmp.move(this.offset, this.offset);
            }
            return tmp;
        });
        CmdService.execute(new CmdSVG(toPaste));
    }
}