import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'app-width',
    templateUrl: './width.component.html',
    styleUrls: ['./width.component.scss', '../toolbar-option.scss'],
})
export class WidthComponent implements OnInit {
    readonly MAX_WIDTH: number = 25.0;
    readonly MIN_WIDTH: number = 0.5;

    @Output()
    widthEmmiter: EventEmitter<number> = new EventEmitter<number>();
    private mWidth: number;

    constructor() {
        //
    }

    ngOnInit() {
        //
    }

    get width(): number {
        return this.mWidth;
    }

    @Input()
    set width(width: number) {
        this.mWidth = width;
        this.widthEmmiter.emit(width);
    }

}
