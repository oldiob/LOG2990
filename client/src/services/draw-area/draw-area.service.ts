import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Drawing } from './i-drawing';

@Injectable({
    providedIn: 'root',
})
export class DrawAreaService {
    isSavedDrawing: boolean;

    private savedDrawings: Drawing[] = [];
    drawings = new BehaviorSubject(this.savedDrawings);

    constructor() {
        this.isSavedDrawing = true;
    }

    save(drawing: Drawing): void {
        this.isSavedDrawing = true;

        // ! Remove following once server is implemented
        this.savedDrawings.push(drawing);
        this.drawings.next(this.savedDrawings);
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
