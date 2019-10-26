import { Component, ElementRef, OnInit, ViewChild, Injector } from '@angular/core';
import { PaletteService } from 'src/services/palette/palette.service';
import { SVGService } from 'src/services/svg/svg.service';
import { ITool } from 'src/services/tool/tool-options/i-tool';
import { Color } from 'src/utils/color';
import { DOMRenderer } from 'src/utils/dom-renderer';
import { CmdInterface } from 'src/services/cmd/cmd.service';
import { MyInjector } from 'src/utils/injector';
import { CmdSVG } from 'src/services/cmd/cmd.svg';

@Component({
    selector: 'app-showcase',
    templateUrl: './showcase.component.html',
    styleUrls: ['./showcase.component.scss'],
})
export class ShowcaseComponent implements OnInit {
    readonly WIDTH = 300;
    readonly HEIGHT = 200;

    readonly STRETCH_V_CONST = 38.0;
    readonly STRETCH_H_CONST = 8.0 * Math.PI;

    readonly H_SHIFT = this.WIDTH / 2.0;
    readonly V_SHIFT = this.HEIGHT / 2.0;

    readonly MIN = -3.0 * Math.PI / 2.0;
    readonly MAX = 3.0 * Math.PI / 2.0;

    readonly STEP = 0.5;

    private currentTool: ITool;

    @ViewChild('svgContainer', { static: true })
    entry: ElementRef;

    service: SVGService | null;
    mouseEvent: MouseEvent;

    fakeInjector: Injector;

    constructor(palette: PaletteService) {
        this.mouseEvent = new MouseEvent('', undefined);
        this.service = null;

        palette.primaryObs$.subscribe((color: Color) => this.displayCurrent());
        palette.secondaryObs$.subscribe((color: Color) => this.displayCurrent());
    }

    ngOnInit() {
        this.service = new SVGService();
        this.service.entry = this.entry;

        DOMRenderer.setAttribute(this.entry.nativeElement, 'width', this.WIDTH.toString());
        DOMRenderer.setAttribute(this.entry.nativeElement, 'height', this.HEIGHT.toString());

        this.service.clearDrawArea();

        this.fakeInjector = new CustomInjector(this.service);
    }

    private displayCurrent() {
        if (this.currentTool) {
            this.display(this.currentTool);
        }
    }

    display(tool: ITool) {
        if (this.service == null) {
            return;
        }

        const realInjector = MyInjector.injector;
        MyInjector.injector = this.fakeInjector;

        this.currentTool = tool;

        let actionMade: CmdInterface | null = null;

        this.service.clearDrawArea();
        if (tool.onShowcase) {
            actionMade = tool.onShowcase(this.WIDTH, this.HEIGHT);
        } else {
            actionMade = this.sinShowcase(tool);
        }

        if (actionMade !== null) {
            if (Object.getPrototypeOf(actionMade) === CmdSVG.prototype) {
                actionMade.execute();
            }
        }

        MyInjector.injector = realInjector;
    }

    private sinShowcase(tool: ITool): CmdInterface | null {

        let object: CmdInterface | null = null;

        for (let i = this.MIN; i <= this.MAX; i += this.STEP) {
            if (i === this.MIN) {
                object = tool.onPressed(this.sinClick(i));
            }
            tool.onMotion(this.sinClick(i));
        }
        tool.onReleased(this.mouseEvent);
        return object;
    }

    click(x: number, y: number): MouseEvent {
        this.mouseEvent.svgX = x;
        this.mouseEvent.svgY = y;
        return this.mouseEvent;
    }

    private sinClick(x: number): MouseEvent {
        return this.click(
            x * this.STRETCH_H_CONST + this.H_SHIFT,
            Math.sin(x) * this.STRETCH_V_CONST + this.V_SHIFT);
    }
}

// tslint:disable-next-line: max-classes-per-file
class CustomInjector extends Injector {

    private service: SVGService;

    constructor(service: SVGService) {
        super();

        this.service = service;
    }

    get(token: any, notFoundValue?: any) {
        if (token === SVGService) {
            return this.service;
        }

        return undefined;
    }
}
