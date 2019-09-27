import { Injectable } from '@angular/core';

import { RingBuffer } from 'src/utils/ring-buffer';

enum Base {
    hex = 16,
}

@Injectable({
    providedIn: 'root',
})
export class PaletteService {

    constructor() {
        this.primary = PaletteService.DEFAULT_PRIMARY;
        this.secondary = PaletteService.DEFAULT_SECONDARY;
        this.previous = new RingBuffer<number>(PaletteService.MAX_HISTORY);
        this.previous.memSet(PaletteService.DEFAULT_MEMSET);
    }

    static readonly DEFAULT_PRIMARY = 0xFF0000FF;
    static readonly DEFAULT_SECONDARY = 0xFFFFFFFF;
    static readonly DEFAULT_MEMSET = 0;
    static readonly MAX_HISTORY = 10;

    primary: number;
    secondary: number;
    previous: RingBuffer<number>;

    private static formatColor(color: number, base: number): string {
        return `#${color.toString(base)}`;
    }

    swap() {
        const tmp: number = this.primary;
        this.primary = this.secondary;
        this.secondary = tmp;
    }

    selectPrimary(color: number) {
        const previous: number = this.primary;
        this.primary = color;
        this.previous.add(previous);
    }

    selectSecondary(color: number) {
        const previous: number = this.secondary;
        this.secondary = color;
        this.previous.add(previous);
    }

    getPrimary(): string {
        return PaletteService.formatColor(this.primary, Base.hex);
    }

    getSecondary(): string {
        return PaletteService.formatColor(this.secondary, Base.hex);
    }

    getHistory(): string[] {
        return this.previous.arr.map((value: number) => {
            return PaletteService.formatColor(value, Base.hex);
        });
    }
}
