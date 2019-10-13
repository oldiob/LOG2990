import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { SVGService } from 'src/services/svg/svg.service';
import { IOption } from 'src/services/tool/tool-options/i-option';

export interface Drawing {
    id: number;
    preview: string;
    tags: string[];
    svgs: string[];
}

@Component({
    selector: 'app-gallery-option',
    templateUrl: './gallery-option.component.html',
    styleUrls: ['./gallery-option.component.scss', '../toolbar-option.scss'],
})
export class GalleryOptionComponent implements OnInit, IOption<string> {
    displayedColumns: string[] = ['tags'];

    images: Map<string, string>;

    drawingData: Drawing[];
    dataSource: MatTableDataSource<Drawing>;

    constructor(private svgService: SVGService) {
        const DRAWING_DATA: Drawing[] = [
            { id: 1, preview: JSON.stringify(this.svgService.entry), tags: ['house', 'big', 'wood'], svgs: [''] },
            { id: 2, preview: '', tags: ['small'], svgs: [''] },
            { id: 3, preview: '', tags: ['small'], svgs: [''] },
            { id: 4, preview: '', tags: ['small', 'old'], svgs: [''] },
            { id: 5, preview: '', tags: ['human'], svgs: [''] },
            { id: 6, preview: '', tags: ['human'], svgs: [''] },
            { id: 7, preview: '', tags: ['wood', 'old'], svgs: [''] },
            { id: 8, preview: '', tags: ['asphalt'], svgs: [''] },
            { id: 9, preview: '', tags: ['human', 'old'], svgs: [''] },
            { id: 10, preview: '', tags: ['human', 'old'], svgs: [''] },
        ];
        this.dataSource = new MatTableDataSource(DRAWING_DATA);
        this.dataSource.filterPredicate = this.makeFilter();

    }

    ngOnInit() {
        //
    }

    filter(filterValue: string) {
        this.dataSource.filter = filterValue.toLowerCase();
    }

    private makeFilter(): (data: any, filter: string) => boolean {
        return (data: any, filter: string): boolean => {
            const hasTag: boolean =
                data.tags.some((tag: string) => filter.includes(tag.toLowerCase()) || tag.toLowerCase().includes(filter));
            return hasTag;
        };
    }

    select() {
        //
    }

    getImage() {
        const IMAGE = '../../../assets/images/gallery.png';
        return IMAGE;
    }
}
