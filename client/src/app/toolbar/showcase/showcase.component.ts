import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { SVGService } from 'src/services/svg/svg.service';
import { RendererProviderService } from 'src/services/renderer-provider/renderer-provider.service';
import { ITool } from 'src/services/tool/tool-options/i-tool';

@Component({
    selector: 'app-showcase',
    templateUrl: './showcase.component.html',
    styleUrls: ['./showcase.component.scss']
})
export class ShowcaseComponent implements OnInit {
    @ViewChild('svgContainer', {static: true})
    entry: ElementRef;

    private service: SVGService;

    constructor(rendererProvider: RendererProviderService) {
        this.service = new SVGService(rendererProvider);
        this.service.entry = this.entry;
    }

    ngOnInit() {
        //
    }

    display(tool: ITool) {
        //
    }
}
