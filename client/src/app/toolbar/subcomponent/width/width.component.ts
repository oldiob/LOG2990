import { Component, EventEmitter, Input, OnInit, Output, ElementRef } from '@angular/core';

@Component({
    selector: 'app-width',
    templateUrl: './width.component.html',
    styleUrls: ['./width.component.scss', '../../toolbar-option.scss'],
})
export class WidthComponent implements OnInit {
    readonly MAX_WIDTH: number = 25.0;
    readonly MIN_WIDTH: number = 0.5;

    private mWidth: number;

    @Input()
    title: string;

    @Output()
    widthEmmiter: EventEmitter<number> = new EventEmitter<number>();

    constructor(private current: ElementRef) {
        this.mWidth = 5.0;
    }

    ngOnInit() {
        //
    }

    get width(): number {
        return this.mWidth;
    }

    @Input()
    set width(width: number) {
        console.log(this.current.nativeElement.offsetParent);
        if (width <= this.MAX_WIDTH && width >= this.MIN_WIDTH ) {
            this.mWidth = width;
        }
        this.widthEmmiter.emit(this.mWidth);
    }
}
