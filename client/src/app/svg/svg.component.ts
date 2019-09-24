import { Component, Input, OnInit } from '@angular/core';
import { SVGInterface } from 'src/services/svg/element/svg.interface';
import { SVGService } from 'src/services/svg/svg.service';
import { ToolService } from 'src/services/tool/tool.service';

@Component({
    selector: 'app-svg',
    templateUrl: './svg.component.html',
    styleUrls: ['./svg.component.scss'],
})
export class SVGComponent implements OnInit {

    @Input() _width: number;
    @Input() _height: number;

    constructor(private svgService: SVGService, private toolService: ToolService) { }

    ngOnInit() { }

    onPressed(event: MouseEvent) {
        const obj: SVGInterface | null = this.toolService.getCurrentTool().onPressed(event);
        if (obj != null) {
            this.svgService.addObj(obj);
        }
    }
    onReleased(event: MouseEvent) {
        this.toolService.getCurrentTool().onReleased(event);
    }
    onMotion(event: MouseEvent) {
        this.toolService.getCurrentTool().onMotion(event);
    }

    get width(): string {
        return `${this._width}px`;
    }
    get height(): string {
        return `${this._height}px`;
    }
}
