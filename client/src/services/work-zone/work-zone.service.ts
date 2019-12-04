import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Color } from 'src/utils/color';
import { populateDrawArea, serializeDrawArea } from 'src/utils/element-parser';
import { MyInjector } from 'src/utils/injector';
import { Drawing } from '../draw-area/i-drawing';
import { SVGService } from '../svg/svg.service';

@Injectable({
    providedIn: 'root',
})
export class WorkZoneService {

    private widthValue: number;
    private heightValue: number;
    private backgroundColorValue: Color;

    private widthSubject: BehaviorSubject<number>;
    private heightSubject: BehaviorSubject<number>;
    private backgroundColorSubject: BehaviorSubject<Color>;

    private maxWidthSubject: BehaviorSubject<number>;
    private maxHeightSubject: BehaviorSubject<number>;

    cursor: string;

    constructor() {
        this.widthValue = 0;
        this.heightValue = 0;

        const RED = 255;
        const GREEN = 255;
        const BLUE = 255;
        const ALPHA = 1;
        this.backgroundColorValue = new Color(RED, GREEN, BLUE, ALPHA);

        this.widthSubject = new BehaviorSubject<number>(this.widthValue);
        this.heightSubject = new BehaviorSubject<number>(this.heightValue);
        this.backgroundColorSubject = new BehaviorSubject<Color>(this.backgroundColorValue);

        this.maxWidthSubject = new BehaviorSubject<number>(this.widthValue);
        this.maxHeightSubject = new BehaviorSubject<number>(this.heightValue);

        this.cursor = 'crosshair';
    }

    get currentWidth(): Observable<number> {
        return this.widthSubject.asObservable();
    }
    get currentHeight(): Observable<number> {
        return this.heightSubject.asObservable();
    }
    get currentBackgroundColor(): Observable<Color> {
        return this.backgroundColorSubject.asObservable();
    }
    get currentMaxWidth(): Observable<number> {
        return this.maxWidthSubject.asObservable();
    }
    get currentMaxHeight(): Observable<number> {
        return this.maxHeightSubject.asObservable();
    }

    setFromDrawing(drawing: Drawing): void {
        const svgService: SVGService = MyInjector.get(SVGService);

        svgService.clearObjects();
        populateDrawArea(svgService, drawing.holder);
        this.updateDrawAreaProperties(drawing.width, drawing.height, drawing.backgroundColor);
    }

    getAsDrawing(): Drawing {
        const svgService: SVGService = MyInjector.get(SVGService);

        const drawing: Drawing = new Drawing();

        drawing.width = this.widthValue;
        drawing.height = this.heightValue;
        drawing.backgroundColor = this.backgroundColorValue.toRGBA();
        drawing.holder = serializeDrawArea(svgService);

        return drawing;
    }

    updateDrawAreaProperties(width: number, height: number, backgroundColor: string) {
        const color: Color = Color.getColorFromRGBA(backgroundColor);

        this.widthSubject.next(width);
        this.heightSubject.next(height);
        this.backgroundColorSubject.next(color);

        this.widthValue = width;
        this.heightValue = height;
        this.backgroundColorValue = color;
    }

    // Updates Work Zone initial dimensions values
    updateMaxDimensions(maxWidth: number, maxHeight: number): void {
        this.maxWidthSubject.next(maxWidth);
        this.maxHeightSubject.next(maxHeight);
    }

    updateBackgroundColor(color: Color): void {
        this.backgroundColorValue = color;
        this.backgroundColorSubject.next(color);
    }

    resetCursor(): void {
        this.cursor = 'crosshair';
    }
}
