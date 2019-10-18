import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { WorkZoneService } from 'src/services/work-zone/work-zone.service';

export interface Size {
    width: number;
    height: number;
}

@Component({
    selector: 'app-thumbnail',
    templateUrl: './thumbnail.component.svg',
    styleUrls: ['./thumbnail.component.scss'],
})
export class ThumbnailComponent implements OnInit {
    @Input()
    thumbnailSVG: SVGElement;

    thumbnail: Size;
    drawing: Size;

    constructor(
        private renderer: Renderer2,
        private element: ElementRef,
        private workZoneService: WorkZoneService) { }

    ngOnInit() {
        this.thumbnail = { width: 200, height: 112.5 };
        this.drawing = this.getDrawingDimensions();
        this.appendSVG();
        this.scale();
    }

    private appendSVG() {
        this.renderer.appendChild(this.element.nativeElement, this.thumbnailSVG);
        this.setSize();
    }

    private setSize() {
        this.renderer.setStyle(
            this.thumbnailSVG,
            'width',
            `${this.thumbnail.width}`,
        );
        this.renderer.setStyle(
            this.thumbnailSVG,
            'height',
            `${this.thumbnail.height}`,
        );
        this.renderer.setStyle(
            this.thumbnailSVG,
            'cursor',
            'pointer',
        );
        this.renderer.setAttribute(
            this.thumbnailSVG,
            'viewbox',
            '0 0 ' + `${this.drawing.width}` + ' ' + `${this.drawing.height}`,
        );
    }

    private scale() {
        const SCALE_WIDTH = this.thumbnail.width / this.drawing.width;
        const SCALE_HEIGHT = this.thumbnail.height / this.drawing.height;

        this.thumbnailSVG.childNodes.forEach((child) => {
            this.renderer.setAttribute(
                child,
                'transform',
                'scale(' + `${SCALE_WIDTH}` + ' ' + `${SCALE_HEIGHT}` + ')',
            );
        });
    }

    private getDrawingDimensions(): Size {
        let drawingWidth = 0;
        this.workZoneService.currentWidth.subscribe((currentWidth: number) => {
            drawingWidth = currentWidth;
        });
        let drawingHeight = 0;
        this.workZoneService.currentHeight.subscribe((currentHeight: number) => {
            drawingHeight = currentHeight;
        });
        return { width: drawingWidth, height: drawingHeight };
    }
}
