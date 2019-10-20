import { Injectable } from '@angular/core';

import { Color } from 'src/utils/color';
import { RingBuffer } from 'src/utils/ring-buffer';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PaletteService {

    constructor() {
        this.primarySubject = new Subject<Color>();
        this.primaryObs$ = this.primarySubject.asObservable();

        this.secondarySubject = new Subject<Color>();
        this.secondaryObs$ = this.secondarySubject.asObservable();

        this.primary = PaletteService.DEFAULT_PRIMARY;
        this.secondary = PaletteService.DEFAULT_SECONDARY;
        this.previous = new RingBuffer<Color>(PaletteService.MAX_HISTORY);
        this.previous.memSet(PaletteService.DEFAULT_MEMSET);
    }

    static readonly DEFAULT_PRIMARY: Color = new Color(30, 30, 30, 1);
    static readonly DEFAULT_SECONDARY: Color = new Color(170, 170, 170, 1);
    static readonly DEFAULT_MEMSET: Color = new Color(255, 255, 255, 1);
    static readonly MAX_HISTORY = 10;

    private mPrimary: Color;
    private mSecondary: Color;

    private primarySubject: Subject<Color>;
    private secondarySubject: Subject<Color>;

    primaryObs$: Observable<Color>;
    secondaryObs$: Observable<Color>;

    previous: RingBuffer<Color>;

    set primary(color: Color) {
        this.mPrimary = color;
        this.primarySubject.next(this.mPrimary);
    }
    get primary(): Color {
        return this.mPrimary;
    }

    set secondary(color: Color) {
        this.mSecondary = color;
        this.primarySubject.next(this.mSecondary);
    }
    get secondary(): Color {
        return this.mSecondary;
    }

    swap() {
        const tmp: Color = this.primary;
        this.primary = this.secondary;
        this.secondary = tmp;
    }

    selectPrimary(r: number, g: number, b: number, a: number) {
        const previous: Color = this.primary;
        this.primary = new Color(r, g, b, a);
        this.previous.add(previous);
    }

    selectSecondary(r: number, g: number, b: number, a: number) {
        const previous: Color = this.secondary;
        this.secondary = new Color(r, g, b, a);
        this.previous.add(previous);
    }

    getPrimary(): string {
        return this.primary.toString();
    }

    getSecondary(): string {
        return this.secondary.toString();
    }

    getHistory(): Color[] {
        return this.previous.arr.map((color: Color) => {
            return color;
        });
    }
}
