import { Component, OnInit } from '@angular/core';
import { IOption } from 'src/services/tool/tool-options/i-option';

@Component({
    selector: 'app-gallery-option',
    templateUrl: './gallery-option.component.html',
    styleUrls: ['./gallery-option.component.scss', '../toolbar-option.scss'],
})
export class GalleryOptionComponent implements OnInit, IOption<string> {

    images: Map<string, string>;

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
        const IMAGE = '../../../assets/images/gallery.png';
        return IMAGE;
    }
}
