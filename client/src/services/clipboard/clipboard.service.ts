import { Injectable } from '@angular/core';
import { CmdCut } from 'src/services/cmd/cmd.cut';
import { CmdService } from 'src/services/cmd/cmd.service';
import { CmdSVG } from 'src/services/cmd/cmd.svg';
import { SVGAbstract } from 'src/services/svg/element/svg.abstract';
import { SVGService } from 'src/services/svg/svg.service';
import { SelectorTool } from 'src/services/tool/tool-options/selector';
import { copySVG } from 'src/utils/element-parser';

@Injectable({
    providedIn: 'root',
})
export class ClipboardService {

    copied: SVGAbstract[] = [];
    offset: number[] = [0, 0];

    constructor(public selector: SelectorTool, public svg: SVGService) { }

    copy(): void {
        this.copied = [];
        this.selector.selected.children.forEach((child) => {
            this.copied.push(copySVG(child));
        });
        this.offset = [0, 0];
    }

    cut(): void {
        this.copy();
        this.selector.clearSelection();
        CmdService.execute(new CmdCut(this.copied));
    }

    duplicate(): void {
        const copiedBefore = Array.from(this.copied);
        this.copy();
        this.paste();
        this.copied = copiedBefore;
    }

    paste(): void {
        const toPaste: SVGAbstract[] = this.copied.map((object) => {
            const tmp: SVGAbstract = copySVG(object);
            this.offset = this.selector.nextOffset(this.offset);
            tmp.translate(this.offset[0], this.offset[1]);
            return tmp;
        });
        CmdService.execute(new CmdSVG(toPaste));
    }
}
