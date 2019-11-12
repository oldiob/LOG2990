import { Component, ElementRef, Injector, OnInit, ViewChild } from '@angular/core';
import { CmdInterface } from 'src/services/cmd/cmd.service';
import { CmdSVG } from 'src/services/cmd/cmd.svg';
import { SVGService } from 'src/services/svg/svg.service';
import { ITool } from 'src/services/tool/tool-options/i-tool';
import { DOMRenderer } from 'src/utils/dom-renderer';
import { MyInjector } from 'src/utils/injector';
import { ToolService } from 'src/services/tool/tool.service';
import { ShowcaseSignal } from 'src/utils/showcase-signal';

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

    @ViewChild('svgContainer', { static: true })
    entry: ElementRef;

    service: SVGService | null;
    mouseEvent: MouseEvent;

    fakeInjector: Injector;

    constructor(private toolService: ToolService) {
        this.mouseEvent = new MouseEvent('', undefined);
        this.service = null;

        ShowcaseSignal.observable.subscribe(() => this.display());
    }

    ngOnInit() {
        this.service = new SVGService();
        this.service.entry = this.entry;

        DOMRenderer.setAttribute(this.entry.nativeElement, 'width', this.WIDTH.toString());
        DOMRenderer.setAttribute(this.entry.nativeElement, 'height', this.HEIGHT.toString());

        this.service.clearObjects();

        this.fakeInjector = new CustomInjector(this.service);
    }

    display() {
        if (this.service == null) {
            return;
        }

        const realInjector = MyInjector.injector;
        MyInjector.injector = this.fakeInjector;

        let actionMade: CmdInterface | null = null;

        this.service.clearObjects();
        if (this.toolService.currentTool.onShowcase) {
            actionMade = this.toolService.currentTool.onShowcase(this.WIDTH, this.HEIGHT);
        } else {
            actionMade = this.sinShowcase(this.toolService.currentTool);
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
