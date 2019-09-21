import { Component, OnInit } from '@angular/core';
import { SVGService } from 'src/app/services/svg/svg.service';
import { SVGInterace } from 'src/app/services/svg/svg.interface';


@Component({
    selector: 'app-svg',
    templateUrl: './svg.component.html',
    styleUrls: ['./svg.component.scss'],
})
export class SVGComponent implements OnInit {

    constructor(private svgService: SVGService) {
    }
    ngOnInit() {
    }
    onPressed(event: MouseEvent) {
        let obj: SVGInterface | null = this.svgService.onPressed(event);
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
}
