import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
    drawings: Drawing[];
    filteredDrawings: Drawing[];
    drawingsOnPage: Drawing[];

    isTagExists: boolean;

    readonly N_DRAWINGS_PER_PAGE = 8;
    page: number;
    beginPage: number;
    endPage: number;

    constructor(
        private workZoneService: WorkZoneService,
        private svgService: SVGService,
        private webClientService: WebClientService) { }

    ngOnInit() {
        this.isTagExists = true;
        this.filter = '';
        this.filterCallback = this.makeFilterCallback();
        this.filteredDrawings = this.drawings;
        this.drawingsOnPage = [];
        this.page = 1;
    }

    load() {
        this.drawings = [];

        this.webClientService.getAllDrawings().subscribe((savedDrawing: Drawing[]) => {
            this.drawings = savedDrawing;
            this.refresh();
        });

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
                this.filterPage();
            } else {
                this.isTagExists = false;
            }
        }
        this.filterPage();
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
        populateDrawArea(this.svgService, drawing.holder);
        this.workZoneService.updateDrawAreaDimensions(drawing.width, drawing.height, drawing.backgroundColor);
    }

    onDelete(event: MouseEvent, drawing: Drawing) {
        for (let i = 0; i < this.filterDrawings.length; i++) {
            if (this.filteredDrawings[i].id === drawing.id) {
                this.drawings.splice(i, 1);
            }
        }
        this.webClientService.deleteDrawing(drawing.id).subscribe((res: Response) => console.log(res));
    }

    onClose() {
    }

    previousPage(): void {
        if (this.page > 1) {
            this.page--;
            this.refresh();
        }
    }

    nextPage(): void {
        const nPages = Math.ceil(this.filteredDrawings.length / this.N_DRAWINGS_PER_PAGE);
        if (this.page < nPages) {
            this.page++;
            this.refresh();
        }
    }

    filterPage(): void {
        if (this.filteredDrawings.length < this.N_DRAWINGS_PER_PAGE) {
            this.drawingsOnPage = this.filteredDrawings;
            return;
        }

        this.beginPage = this.page * this.N_DRAWINGS_PER_PAGE - this.N_DRAWINGS_PER_PAGE;
        this.endPage = this.page * this.N_DRAWINGS_PER_PAGE;

        if (this.endPage > this.filteredDrawings.length) {
            this.endPage = this.filteredDrawings.length;
        }

        this.drawingsOnPage = this.filteredDrawings.slice(this.beginPage, this.endPage);
    }
}
