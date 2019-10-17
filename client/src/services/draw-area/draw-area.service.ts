import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Drawing } from './i-drawing';

@Injectable({
    providedIn: 'root',
})
export class DrawAreaService {
    isSavedDrawing: boolean;

    drawings: BehaviorSubject<Drawing[]>;

    constructor() {
        const INITIAL_DRAWINGS: Drawing[] = [];
        this.drawings = new BehaviorSubject(INITIAL_DRAWINGS);

        this.isSavedDrawing = true;
    }

    save(drawing: Drawing): void {
        this.isSavedDrawing = true;

        // ! Remove following once server is implemented
        this.drawings.value.push(drawing);
    }

    // TODO: Fetch a list of saved drawings (id: number, name: string, tag: string[], thumbnail: JPEG) from server
    fetch(id: number) {
        //
    }

    // TODO: Fetch a drawing (objects containing infos on svg elements)
    fetchSVGInfos() {
        //
    }

    dirty() {
        this.isSavedDrawing = false;
    }
}
