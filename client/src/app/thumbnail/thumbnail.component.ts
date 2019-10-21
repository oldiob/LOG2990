import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { DOMRenderer } from 'src/utils/dom-renderer';

@Component({
    selector: 'app-thumbnail',
    templateUrl: './thumbnail.component.html',
    styleUrls: ['./thumbnail.component.scss'],
})
export class ThumbnailComponent implements OnInit {
    @Input()
    thumbnailSVG: string;

    @Input()
    svgWidth: number;

    @Input()
    svgHeight: number;

    constructor(private element: ElementRef) {
        //
    }

    ngOnInit() {
        this.adjustSize();

        console.log('THUMBNAIL', this.svgWidth, this.svgHeight);
        const svgImage: HTMLImageElement = new Image(this.svgWidth, this.svgHeight);
        svgImage.src = 'data:image/svg+xml;base64,' + window.btoa(this.thumbnailSVG);

        const onload = (): void => {
            DOMRenderer.appendChild(this.element.nativeElement, svgImage);
        };

        svgImage.onload = onload;
    }

    private adjustSize(): void {
        const MAX_WIDTH = 200;
        const MAX_HEIGHT = 100;

        let ratio = 1.0;

        if ((this.svgWidth / MAX_WIDTH) > (this.svgHeight / MAX_HEIGHT)) {
            ratio = this.svgWidth / MAX_WIDTH;
        } else {
            ratio = this.svgHeight / MAX_HEIGHT;
        }

        this.svgWidth /= ratio;
        this.svgHeight /= ratio;
    }
}
