import { Injectable } from '@angular/core';

import { RingBuffer } from '../../utils/ring-buffer';

export class ColorPalette {

    primary: number;
    secondary: number;
    previous: RingBuffer<number>;

    constructor(primary: number, secondary: number) {
        const MAX_HISTORY = 10;

        this.primary = primary;
        this.secondary = secondary;
        this.previous = new RingBuffer<number>(MAX_HISTORY);
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
}
