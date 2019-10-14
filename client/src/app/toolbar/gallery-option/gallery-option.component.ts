import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DrawAreaService } from 'src/services/draw-area/draw-area.service';
import { Drawing } from 'src/services/draw-area/i-drawing';
import { IOption } from 'src/services/tool/tool-options/i-option';

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

    constructor(private drawAreaService: DrawAreaService) { }

    ngOnInit() {
        this.isTagExists = true;
        this.filter = '';
        this.filterCallback = this.makeFilterCallback();
        this.updateDrawings();
        this.filteredDrawings = this.drawings;
    }

    private updateDrawings() {
        this.drawings = [];
        this.drawAreaService.drawings.subscribe((savedDrawing: Drawing[]) => {
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
}
