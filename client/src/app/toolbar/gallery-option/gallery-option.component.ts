import { Component, OnInit } from '@angular/core';
import { IOption } from 'src/services/tool/tool-options/i-option';

@Component({
    selector: 'app-gallery-option',
    templateUrl: './gallery-option.component.html',
    styleUrls: ['./gallery-option.component.scss', '../toolbar-option.scss'],
})
export class GalleryOptionComponent implements OnInit, IOption {

    constructor() {
        //
    }

    ngOnInit() {
        //
    }

    select() {
        //
    }

    getImage() {
        const BUTTON_FILENAME = '../../../assets/images/gallery.png';
        return BUTTON_FILENAME;
    }
}
