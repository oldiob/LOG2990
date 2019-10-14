import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SVGService } from '../svg/svg.service';
import { Drawing } from './i-drawing';

const mockDrawings: Drawing[] = [
    { id: 1, name: 'house', thumbnail: null, tags: ['house', 'big'], svgs: [''] },
    { id: 2, name: 'me', thumbnail: null, tags: ['small'], svgs: [''] },
    { id: 3, name: 'me', thumbnail: null, tags: ['medium'], svgs: [''] },
    { id: 4, name: 'home', thumbnail: null, tags: ['house', 'new'], svgs: [''] },
    { id: 5, name: 'dog', thumbnail: null, tags: ['animal'], svgs: [''] },
    { id: 6, name: 'simon', thumbnail: null, tags: ['human'], svgs: [''] },
    { id: 7, name: 'table', thumbnail: null, tags: ['wood', 'big'], svgs: [''] },
    { id: 8, name: 'road', thumbnail: null, tags: ['asphalt'], svgs: [''] },
    { id: 9, name: 'cat', thumbnail: null, tags: ['animal', 'old'], svgs: [''] },
    { id: 10, name: 'sun', thumbnail: null, tags: ['star', 'yellow', 'hot'], svgs: [''] },
];

@Injectable({
    providedIn: 'root',
})
export class DrawAreaService {
    isSavedDrawing: boolean;

    private savedDrawings: Drawing[] = [];
    drawings = new BehaviorSubject(this.savedDrawings);

    constructor(private svgService: SVGService) {
        this.isSavedDrawing = true;
    }

    save() {
        this.isSavedDrawing = true;
        this.addDrawing();
    }

    private addDrawing() {
        const index = Math.floor(Math.random() * 10);
        const preview = this.svgService.entry.nativeElement;
        this.savedDrawings.push({
            id: index,
            name: mockDrawings[index].name,
            thumbnail: preview,
            tags: mockDrawings[index].tags,
            svgs: [''],
        });
        console.log(this.savedDrawings);
        this.drawings.next(this.savedDrawings);
    }

    dirty() {
        this.isSavedDrawing = false;
    }
}
