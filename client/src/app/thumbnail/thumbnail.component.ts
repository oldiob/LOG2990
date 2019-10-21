import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { DOMRenderer } from 'src/utils/dom-renderer';

export interface Size {
    width: number;
    height: number;
}

@Component({
    selector: 'app-thumbnail',
    templateUrl: './thumbnail.component.html',
    styleUrls: ['./thumbnail.component.scss'],
})
export class ThumbnailComponent implements OnInit {
    @Input()
    thumbnailSVG: string;

    constructor(private element: ElementRef) {
        //
    }

    ngOnInit() {
        console.log('THUMBNAIL', this.thumbnailSVG);
        const svgImage: HTMLImageElement = new Image(200, 200);
        svgImage.src = 'data:image/svg+xml;base64,' + window.btoa(this.thumbnailSVG);

        const onload = (): void => {
            console.log('LOADED');
            DOMRenderer.appendChild(this.element.nativeElement, svgImage);
        };

        svgImage.onload = onload;

    }
}
