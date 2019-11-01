import { Injectable } from '@angular/core';
import { WebClientService } from '../web-client/web-client.service';
import { Drawing } from './i-drawing';

@Injectable({
    providedIn: 'root',
})
export class DrawAreaService {

    isSavedDrawing: boolean;
    constructor(
        private webClientServer: WebClientService) {
        this.isSavedDrawing = true;
    }

    save(drawing: Drawing): void {
        this.isSavedDrawing = true;
        this.webClientServer.sendDrawing(drawing);
    }

    dirty() {
        this.isSavedDrawing = false;
    }
}
