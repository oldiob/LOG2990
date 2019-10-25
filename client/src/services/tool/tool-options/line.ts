import { Injectable } from '@angular/core';
import { PaletteService } from 'src/services/palette/palette.service';
import { SVGLine } from 'src/services/svg/element/svg.line';
import { ITool, JunctionType, LineType } from './i-tool';
import { CmdSVG } from 'src/services/cmd/cmd.svg';

declare type callback = () => void;

@Injectable({
    providedIn: 'root',
})
export class LineTool implements ITool {

    element: SVGLine | null = null;
    width = 1;
    junctionWidth = 12;
    lineType: LineType;
    junctionType: JunctionType;
    constructor(private paletteService: PaletteService) { }

    onPressed(event: MouseEvent): CmdSVG {
	let cmd: CmdSVG;
        if (this.element) {
            this.element.addAnchor(event.svgX, event.svgY, this.junctionType);
            return cmd;

        }
        const line = new SVGLine(event.svgX, event.svgY, this.junctionWidth, this.lineType,
            this.junctionType);
        line.setWidth(this.width);
        line.setPrimary(this.paletteService.getPrimary());
        this.element = line;
	return new CmdSVG(this.element);
    }

    onReleased(event: MouseEvent): void {
        if (!this.element) {
            return;
        }
        if (event.doubleClick) {
            this.element.anchors.pop();
            this.element.anchors.pop();
            if (event.shiftKey) {
                this.element.lineLoop();
            } else {
                this.element.finish();
            }
            this.element = null;
            return;
        }
    }

    onMotion(event: MouseEvent): void {
        if (this.element) {
            this.element.setCursor(event.svgX, event.svgY);
        }
    }

    onKeyup(event: KeyboardEvent): boolean {
        const actions: { [id: string]: callback } = {
            Escape: () => { if (this.element) { this.element.end(); this.element = null; } },
            Backspace: () => { if (this.element) { this.element.popAnchor(); } },
        };
        if (event.key in actions) {
            const func: callback = actions[event.key];
            func();
            return true;
        }
        return false;
    }

    onShowcase(x: number, y: number): SVGLine | null {
        // const previousElement = this.element;

        // const mouseEvent: MouseEvent = new MouseEvent('', undefined);
        // mouseEvent.svgX = x / 7.0;
        // mouseEvent.svgY = 6.0 * y / 7.0;
        // mouseEvent.doubleClick = false;

        // const element = this.onPressed(mouseEvent);
        // this.onReleased(mouseEvent);

        // mouseEvent.svgX = x / 2.0;
        // mouseEvent.svgY = y / 7.0;
        // mouseEvent.doubleClick = false;
        // this.onMotion(mouseEvent);

        // this.onPressed(mouseEvent);
        // this.onReleased(mouseEvent);

        // mouseEvent.svgX = 6.0 * x / 7.0;
        // mouseEvent.svgY = 6.0 * y / 7.0;
        // mouseEvent.doubleClick = false;
        // this.onMotion(mouseEvent);

        // this.onPressed(mouseEvent);
        // this.onReleased(mouseEvent);

        // this.onPressed(mouseEvent);
        // mouseEvent.doubleClick = true;
        // this.onReleased(mouseEvent);

        // this.element = previousElement;
        // return element;
        return null;
    }
}
