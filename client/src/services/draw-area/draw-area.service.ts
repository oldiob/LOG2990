import { Injectable } from '@angular/core';
import { WebClientService } from '../web-client/web-client.service';
import { Drawing } from './i-drawing';

@Injectable({
    providedIn: 'root',
})
export class DrawAreaService {

    isSaved: boolean;
    constructor(
        private webClientServer: WebClientService) {
        this.isSaved = true;
    }

    save(): void {
        this.isSaved = true;
    }

    dirty(): void {
        this.isSaved = false;
    }

    upload(drawing: Drawing): void {
        this.isSaved = true;
        this.webClientServer.sendDrawing(drawing);
    }
}
