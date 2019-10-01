import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'app-width',
    templateUrl: './width.component.html',
    styleUrls: ['./width.component.scss', '../toolbar-option.scss'],
})
export class WidthComponent implements OnInit {
    readonly MAX_WIDTH: number = 25.0;
    readonly MIN_WIDTH: number = 0.5;

    private mWidth: number;

    @Output()
    widthEmmiter: EventEmitter<number> = new EventEmitter<number>();

    constructor() {
        this.mWidth = 1.0;
    }

    ngOnInit() {
        //
    }

    get width(): number {
        return this.mWidth;
    }

    @Input()
    set width(width: number) {
        if (width <= this.MAX_WIDTH && width >= this.MIN_WIDTH ) {
            this.mWidth = width;
        }
        this.widthEmmiter.emit(this.mWidth);
    }
}
