import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RendererProviderService } from 'src/services/renderer-provider/renderer-provider.service';
import { SVGService } from 'src/services/svg/svg.service';
import { ITool } from 'src/services/tool/tool-options/i-tool';

@Component({
    selector: 'app-showcase',
    templateUrl: './showcase.component.html',
    styleUrls: ['./showcase.component.scss'],
})
export class ShowcaseComponent implements OnInit {
    readonly STRETCH_V_CONST = 32.0;
    readonly STRETCH_H_CONST = 6.0 * Math.PI;

    readonly H_SHIFT = 125;
    readonly V_SHIFT = 75;

    readonly MIN = -3.0 * Math.PI / 2.0;
    readonly MAX = 3.0 * Math.PI / 2.0;

    readonly STEP = 0.5;

    @ViewChild('svgContainer', { static: true })
    entry: ElementRef;

    service: SVGService | null;
    mouseEvent: MouseEvent;

    constructor(private rendererProvider: RendererProviderService) {
        this.mouseEvent = new MouseEvent('', undefined);
        this.service = null;
    }

    ngOnInit() {
        this.service = new SVGService(this.rendererProvider);
        this.service.entry = this.entry;

        this.service.clearDrawArea();
    }

    display(tool: ITool) {
        if (this.service == null) {
            return;
        }

        this.service.clearDrawArea();
        for (let i = this.MIN; i <= this.MAX; i += this.STEP) {
            if (i === this.MIN) {
                this.service.addObject(tool.onPressed(this.sinClick(i)));
            }
            tool.onMotion(this.sinClick(i));
        }

        // coutering the behaviour of double clicked line
        for (let i = 0; i < 2; i++) {
            this.mouseEvent.doubleClick = false;
            tool.onReleased(this.mouseEvent);
            tool.onPressed(this.sinClick(this.MAX));
        }
        this.mouseEvent.doubleClick = true;
        tool.onReleased(this.mouseEvent);
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
