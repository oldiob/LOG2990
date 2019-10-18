import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-junction',
    templateUrl: './junction-width.component.html',
    styleUrls: [ './junction-width.component.scss'],
})
export class JunctionComponent implements OnInit {
    readonly MAX_WIDTH: number = 25.0;
    readonly MIN_WIDTH: number = 0.5;

    private mWidth: number;

    @Output()
    junctionEmmiter: EventEmitter<number> = new EventEmitter<number>();

    constructor() {
        this.mWidth = 5.0;
    }

    ngOnInit() {
        //
    }

    get junctionWidth(): number {
        return this.mWidth;
    }

    @Input()
    set junctionWidth(width: number) {
        if (width <= this.MAX_WIDTH && width >= this.MIN_WIDTH ) {
            this.mWidth = width;
        }
        this.junctionEmmiter.emit(this.mWidth);
    }
}
