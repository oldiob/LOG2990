import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfirmationComponent } from 'src/app/popups/confirmation/confirmation.component';
import { DialogService } from 'src/services/dialog/dialog.service';
import { DrawAreaService } from 'src/services/draw-area/draw-area.service';
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

    tagInput: string;
    isTagExists: boolean;
    isError: boolean;
    isProgressing: boolean;

    readonly N_DRAWINGS_PER_PAGE = 8;
    page: number;
    beginPage: number;
    endPage: number;

    constructor(
        private workZoneService: WorkZoneService,
        private svgService: SVGService,
        private webClientService: WebClientService,
        private drawAreaService: DrawAreaService,
        private dialogService: DialogService) { }

    ngOnInit() {
        this.isTagExists = true;
        this.isError = false;
        this.isProgressing = true;

        this.filter = '';
        this.filterCallback = this.makeFilterCallback();
        this.filteredDrawings = this.drawings;
        this.drawingsOnPage = [];
        this.page = 1;
    }

    load() {
        this.drawings = [];
        this.webClientService.getAllDrawings().subscribe(
            (savedDrawing: Drawing[]) => {
                this.drawings = savedDrawing;
                this.isError = false;
                this.isProgressing = false;
                this.refresh();
            },
            (error: HttpErrorResponse) => {
                this.isError = true;
                this.isProgressing = false;
            },
        );
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
        if (!this.drawAreaService.isSaved) {
            const dialogRef = this.dialogService.openDialog(ConfirmationComponent);
            dialogRef.afterClosed().subscribe(() => {
                this.loadOnDrawArea(drawing);
            });
        } else {
            this.loadOnDrawArea(drawing);
        }
    }

    private loadOnDrawArea(drawing: Drawing) {
        if (this.drawAreaService.isSaved) {
            populateDrawArea(this.svgService, drawing.holder);
            this.workZoneService.updateDrawAreaDimensions(drawing.width, drawing.height, drawing.backgroundColor);
            this.drawAreaService.save();
        }
    }

    onDelete(drawing: Drawing) {
        this.remove(drawing);
        this.webClientService.deleteDrawing(drawing.id);
    }

    private remove(drawing: Drawing) {
        for (let i = 0; i < this.drawingsOnPage.length; i++) {
            if (this.drawingsOnPage[i].id === drawing.id) {
                this.drawingsOnPage.splice(i, 1);
            }
        }
    }

    onClose() {
        //
    }

    onAddTag(drawing: Drawing): void {
        this.addTag(drawing);
        this.webClientService.addTag(drawing.id, this.tagInput);
        this.tagInput = '';
    }

    private addTag(drawing: Drawing): void {
        const targetDrawing = this.drawingsOnPage.find((aDrawing: Drawing) => {
            return aDrawing.id === drawing.id;
        });
        if (targetDrawing && this.tagInput) {
            targetDrawing.tags.push(this.tagInput);
        }
    }

    stopEventPropagation(event: MouseEvent): void {
        event.stopPropagation();
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
