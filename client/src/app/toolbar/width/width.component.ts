import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'app-width',
    templateUrl: './width.component.html',
    styleUrls: ['./width.component.scss',],
})
export class WidthComponent implements OnInit {

    @Output()
    widthEmmiter: EventEmitter<number> = new EventEmitter<number>();
    private mWidth: number;

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
        this.mWidth = width;
        this.widthEmmiter.emit(width);
    }

}
