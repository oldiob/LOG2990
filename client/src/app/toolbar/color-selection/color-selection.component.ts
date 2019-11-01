import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/services/dialog/dialog.service';
import { PaletteService } from 'src/services/palette/palette.service';

@Component({
    selector: 'app-color-selection',
    templateUrl: './color-selection.component.html',
    styleUrls: ['./color-selection.component.scss'],
})
export class ColorSelectionComponent implements OnInit {

    readonly IS_PRIMARY = true;

    isOpenPrimary: boolean;
    isOpenSecondary: boolean;

    constructor(
        private dialogService: DialogService,
        private paletteService: PaletteService) { }

    ngOnInit() {
        this.isOpenPrimary = false;
        this.isOpenSecondary = false;
        this.listenToClose();
    }

    private listenToClose() {
        this.dialogService.isClosedColorObservable.subscribe((isOpen: boolean) => {
            this.isOpenPrimary = isOpen;
            this.isOpenSecondary = isOpen;
        });
    }

    onSwap(): void {
        this.paletteService.swap();
    }

    onOpen(isShowForm: boolean, isPrimary: boolean): void {
        if (isShowForm && isPrimary) {
            this.isOpenPrimary = true;
            this.isOpenSecondary = false;
        } else if (isShowForm && !isPrimary) {
            this.isOpenPrimary = false;
            this.isOpenSecondary = true;
        }
    }

    close() {
        this.isOpenPrimary = false;
        this.isOpenSecondary = false;
    }

}
