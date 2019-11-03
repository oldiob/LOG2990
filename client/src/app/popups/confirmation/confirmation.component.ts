import { Component, OnInit } from '@angular/core';
import { DrawAreaService } from 'src/services/draw-area/draw-area.service';

@Component({
    selector: 'app-confirmation',
    templateUrl: './confirmation.component.html',
    styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent implements OnInit {

    constructor(private drawAreaService: DrawAreaService) { }

    ngOnInit() {
        //
    }

    onYes(): void {
        this.drawAreaService.save();
    }

    onNo(): void {
        this.drawAreaService.dirty();
    }

}
