import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/services/dialog/dialog.service';
import { NewDrawingComponent } from '../popups/new-drawing/new-drawing.component';

@Component({
    selector: 'app-poly-dessin',
    templateUrl: './poly-dessin.component.html',
    styleUrls: ['./poly-dessin.component.scss'],
})
export class PolyDessinComponent implements OnInit {

    constructor(private dialogService: DialogService) { }

    isShowWelcome: boolean;

    ngOnInit() {
        const IS_HIDDEN_WELCOME = 'false';
        const WELCOME_DIALOG_COOKIE = 'HideWelcomeDialog';

        this.isShowWelcome =
            (!sessionStorage.getItem(WELCOME_DIALOG_COOKIE) || sessionStorage.getItem(WELCOME_DIALOG_COOKIE) === IS_HIDDEN_WELCOME);
        if (this.isShowWelcome) {
            this.dialogService.openEntryPoint(WELCOME_DIALOG_COOKIE);

            this.dialogService.isClosedWelcomeObservable.subscribe((isClosedWelcome: boolean) => {
                if (isClosedWelcome) {
                    this.dialogService.openDialog(NewDrawingComponent);
                }
            });
        } else {
            this.dialogService.openDialog(NewDrawingComponent);
        }
    }
}
