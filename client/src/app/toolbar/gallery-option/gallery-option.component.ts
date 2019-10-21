import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DialogService } from 'src/services/dialog/dialog.service';
import { Drawing } from 'src/services/draw-area/i-drawing';
import { SVGService } from 'src/services/svg/svg.service';
import { IOption } from 'src/services/tool/tool-options/i-option';
import { WebClientService } from 'src/services/web-client/web-client.service';
import { WorkZoneService } from 'src/services/work-zone/work-zone.service';
import { populateDrawArea } from 'src/utils/element-parser';

@Component({
    selector: 'app-gallery-option',
    templateUrl: './gallery-option.component.html',
    styleUrls: ['./gallery-option.component.scss', '../toolbar-option.scss'],
})
export class GalleryOptionComponent implements OnInit, IOption<string> {
    @ViewChild('filterInput', { static: true })
    filterInput: ElementRef<HTMLInputElement>;

    images: Map<string, string>;

    private filter: string;
    private filterCallback: (drawing: Drawing) => boolean;
    private drawings: Drawing[];
    filteredDrawings: Drawing[];

    isTagExists: boolean;

    constructor(private dialogService: DialogService,
                private workZoneService: WorkZoneService,
                private svgService: SVGService,
                private webClientService: WebClientService) { }

    ngOnInit() {
        this.dialogService.disableKey();
        this.isTagExists = true;
        this.filter = '';
        this.filterCallback = this.makeFilterCallback();
        this.updateDrawings();
        this.filteredDrawings = this.drawings;
    }

    private updateDrawings() {
        // TODO: Fetch list of saved drawings from server
        this.drawings = [];
        /*
        this.drawAreaService.drawings.subscribe((savedDrawing: Drawing[]) => {
            this.drawings = savedDrawing;
            this.refresh();
        });
        */
        console.log(this.webClientService.getPreparedDrawing());
        this.webClientService.getPreparedDrawing();

        while (this.webClientService.preparedReady === false) {
            //
        }
        this.webClientService.preparedReady = false;
        this.drawings = this.webClientService.preparedDrawings;
        this.refresh();
    }

    filterDrawings(filterValue: string) {
        this.filter = filterValue.toLowerCase();
        this.refresh();
    }

    private refresh() {
        this.filteredDrawings = this.drawings.filter(this.filterCallback);
        this.checkTags();
    }

    private checkTags() {
        this.isTagExists = true;
        if (this.filteredDrawings.length === 0) {
            if (this.filter.length === 0) {
                this.filteredDrawings = this.drawings;
                this.isTagExists = true;
            } else {
                this.isTagExists = false;
            }
        }
    }

    private makeFilterCallback(): (drawing: Drawing) => boolean {
        return (drawing: Drawing) => {
            const hasTag: boolean =
                drawing.tags.some((tag: string) => this.filter.includes(tag.toLowerCase()));
            return hasTag;
        };
    }

    clearFilters() {
        this.filteredDrawings = this.drawings;
        this.filterInput.nativeElement.value = '';
        this.isTagExists = true;
    }

    select() {
        //
    }

    getImage() {
        const IMAGE = '../../../assets/images/gallery.png';
        return IMAGE;
    }

    onClick(event: MouseEvent, drawing: Drawing) {
      populateDrawArea(this.svgService, drawing.svgs);
      this.workZoneService.updateDrawAreaDimensions(drawing.width, drawing.height, drawing.backgroundColor);
    }
    onClose() {
      this.dialogService.enableKey();
    }
}
