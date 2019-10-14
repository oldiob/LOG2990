import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-angle',
    templateUrl: './angle.component.html',
    styleUrls: ['./angle.component.scss'],
})
export class AngleComponent implements OnInit {
    readonly MAX_ANGLE: number = 360.0;
    readonly MIN_ANGLE: number = 0.0;

    private mAngle: number;
    @Output()
    mouseWheelUp: EventEmitter<number> = new EventEmitter();
    @Output()
    mouseWheelDown: EventEmitter<number> = new EventEmitter();
    @Output()
    angleEmmiter: EventEmitter<number> = new EventEmitter<number>();

    constructor() {
        this.mAngle = 0.0;
    }

    ngOnInit() {
        //
    }

    get angle(): number {
        return this.mAngle;
    }

    @Input()
    set angle(angle: number) {
        if (angle <= this.MAX_ANGLE && angle >= this.MIN_ANGLE ) {
            this.mAngle = angle;
        }
        this.angleEmmiter.emit(this.mAngle);
        this.mouseWheelUp.emit(this.mAngle);
        this.mouseWheelDown.emit(this.mAngle);
    }
}
