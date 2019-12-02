import { Injectable } from '@angular/core';
import { CmdService } from 'src/services/cmd/cmd.service';
import { CmdSVG } from 'src/services/cmd/cmd.svg';
import { PaletteService } from 'src/services/palette/palette.service';
import { SVGLine } from 'src/services/svg/element/svg.line';
import { SVGService } from 'src/services/svg/svg.service';
import { ITool, JunctionType, LineType } from './i-tool';

declare type callback = () => void;

@Injectable({
    providedIn: 'root',
})
export class LineTool implements ITool {

    private readonly DEFAULT_WIDTH = 5;
    private readonly LINE_TIP = 'Line (L)';
    readonly tip: string;

    element: SVGLine | null = null;
    width: number;
    cmd: CmdSVG;
    junctionWidth: number;
    lineType: LineType;
    junctionType: JunctionType;

    constructor(private paletteService: PaletteService, private svgService: SVGService) {
        this.tip = this.LINE_TIP;
        this.width = this.DEFAULT_WIDTH;
        this.junctionWidth = this.DEFAULT_WIDTH;
    }

    onPressed(event: MouseEvent): null {
        if (this.element) {
            this.element.addAnchor(event.svgX, event.svgY, this.junctionType);
            return null;
        }
        const line = new SVGLine(event.svgX, event.svgY, this.width, this.junctionWidth, this.lineType, this.junctionType);
        line.setWidth(this.width);
        line.setPrimary(this.paletteService.getPrimary());
        this.element = line;
        this.element.addAnchor(event.svgX, event.svgY, this.junctionType);
        this.cmd = new CmdSVG(this.element);
        this.svgService.addObject(this.element);
        return null;
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
            this.commit();
        }
    }

    onMotion(event: MouseEvent): void {
        if (this.element) {
            this.element.setCursor(event.svgX, event.svgY);
        }
    }

    onKeyup(event: KeyboardEvent): boolean {
        const actions: { [id: string]: callback } = {
            Escape: () => { this.abort(); },
            Backspace: () => { if (this.element) { this.element.popAnchor(); } },
        };
        if (event.key in actions) {
            const func: callback = actions[event.key];
            func();
            return true;
        }
        return false;
    }

    private abort(): void {
        if (this.element) {
            this.element.end();
            this.element = null;
        }
    }

    private commit(): void {
        if (this.element) {
            this.element.end();
            this.svgService.removeObject(this.element);
            CmdService.execute(this.cmd);
            this.element = null;
        }
    }

    onShowcase(x: number, y: number): CmdSVG | null {
        const previousElement = this.element;

        const mouseEvent: MouseEvent = new MouseEvent('', undefined);
        mouseEvent.svgX = x / 7.0;
        mouseEvent.svgY = 6.0 * y / 7.0;
        mouseEvent.doubleClick = false;

        const action = this.onPressed(mouseEvent);
        this.onReleased(mouseEvent);

        mouseEvent.svgX = x / 2.0;
        mouseEvent.svgY = y / 7.0;
        mouseEvent.doubleClick = false;
        this.onMotion(mouseEvent);

        this.onPressed(mouseEvent);
        this.onReleased(mouseEvent);

        mouseEvent.svgX = 6.0 * x / 7.0;
        mouseEvent.svgY = 6.0 * y / 7.0;
        mouseEvent.doubleClick = false;
        this.onMotion(mouseEvent);

        this.onPressed(mouseEvent);
        this.onReleased(mouseEvent);

        this.onPressed(mouseEvent);
        mouseEvent.doubleClick = true;
        this.onReleased(mouseEvent);

        this.element = previousElement;
        return action;
    }
}
