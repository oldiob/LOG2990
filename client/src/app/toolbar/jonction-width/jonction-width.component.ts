import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-jonction',
    templateUrl: './jonction-width.component.html',
    styleUrls: [ './jonction-width.component.scss'],
})
export class JonctionComponent implements OnInit {
    readonly MAX_WIDTH: number = 25.0;
    readonly MIN_WIDTH: number = 0.5;

    private mWidth: number;

    @Output()
    jonctionEmmiter: EventEmitter<number> = new EventEmitter<number>();

    constructor() {
        this.mWidth = 5.0;
    }

    ngOnInit() {
        //
    }

    get jonctionWidth(): number {
        return this.mWidth;
    }

    @Input()
    set jonctionWidth(width: number) {
        if (width <= this.MAX_WIDTH && width >= this.MIN_WIDTH ) {
            this.mWidth = width;
        }
        this.jonctionEmmiter.emit(this.mWidth);
    }
}
