import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/services/dialog/dialog.service';
import { PaletteService } from 'src/services/palette/palette.service';
import { ColorButtonType } from './color-button-type';

@Component({
    selector: 'app-color-selection',
    templateUrl: './color-selection.component.html',
    styleUrls: ['./color-selection.component.scss'],
})
export class ColorSelectionComponent implements OnInit {
    readonly ColorButtonType = ColorButtonType;

    isPrimaryButtonOpened: boolean;
    isSecondaryButtonOpened: boolean;
    isBackgroundButtonOpened: boolean;

    constructor(
        private dialogService: DialogService,
        private paletteService: PaletteService) { }

    ngOnInit() {
        this.isPrimaryButtonOpened = false;
        this.isSecondaryButtonOpened = false;
        this.isBackgroundButtonOpened = false;
        this.listenToClose();
    }

    private listenToClose() {
        this.dialogService.isClosedColorObservable.subscribe((isOpen: boolean) => {
            this.isPrimaryButtonOpened = isOpen;
            this.isSecondaryButtonOpened = isOpen;
        });
    }

    onSwap(): void {
        this.paletteService.swap();
    }

    onOpen(isSettingsShown: boolean, type: ColorButtonType): void {
        if (isSettingsShown) {
            this.openButton(type);
        } else {
            this.closeButton(type);
        }
    }

    private openButton(type: ColorButtonType) {
        switch (type) {
            case ColorButtonType.PrimaryColor:
                this.isPrimaryButtonOpened = true;
                this.isSecondaryButtonOpened = false;
                this.isBackgroundButtonOpened = false;
                break;
            case ColorButtonType.SecondaryColor:
                this.isPrimaryButtonOpened = false;
                this.isSecondaryButtonOpened = true;
                this.isBackgroundButtonOpened = false;
                break;
            case ColorButtonType.BackgroundColor:
                this.isPrimaryButtonOpened = false;
                this.isSecondaryButtonOpened = false;
                this.isBackgroundButtonOpened = true;
                break;
            default:
                break;
        }
    }

    private closeButton(type: ColorButtonType) {
        switch (type) {
            case ColorButtonType.PrimaryColor:
                this.isPrimaryButtonOpened = false;
                break;
            case ColorButtonType.SecondaryColor:
                this.isSecondaryButtonOpened = false;
                break;
            case ColorButtonType.BackgroundColor:
                this.isBackgroundButtonOpened = false;
                break;
            default:
                break;
        }
    }

    close() {
        this.isPrimaryButtonOpened = false;
        this.isSecondaryButtonOpened = false;
        this.isBackgroundButtonOpened = false;
    }

}
