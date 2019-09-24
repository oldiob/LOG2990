import { Component, Input, OnInit } from '@angular/core';
import { SVGInterface } from 'src/services/svg/svg.interface';
import { SVGService } from 'src/services/svg/svg.service';

@Component({
    selector: 'app-svg',
    templateUrl: './svg.component.html',
    styleUrls: ['./svg.component.scss'],
})
export class SVGComponent implements OnInit {

    constructor(private svgService: SVGService) {
    }
    ngOnInit() {
        //
    }
    @Input() _width: number;
    @Input() _height: number;
    onPressed(event: MouseEvent) {
        const obj: SVGInterface | null = this.svgService.onPressed(event);
        if (obj != null) {
            this.svgService.addObj(obj);
        }
    }
    onRelease(event: MouseEvent) {
        this.svgService.onReleased(event);
    }
    onMotion(event: MouseEvent) {
        this.svgService.onMotion(event);
    }

    get width(): string {
        return `${this._width}px`;
    }
    get height(): string {
        return `${this._height}px`;
    }
}
