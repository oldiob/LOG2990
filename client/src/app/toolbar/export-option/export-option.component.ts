import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { SVGService } from 'src/services/svg/svg.service';
import { exportImage } from 'src/utils/filesystem';

@Component({
    selector: 'app-export-option',
    templateUrl: './export-option.component.html',
    styleUrls: ['./export-option.component.scss'],
})
export class ExportOptionComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<ExportOptionComponent>,
        private svgService: SVGService) {
        //
    }

    ngOnInit(): void {
        //
    }

    saveSVG(): void {
        exportImage('lmao', this.svgService.entry, 'bmp');//  saveFile('testSVG', this.svgService.entry.nativeElement.outerHTML, 'png');
    }

    close(): void {
        this.dialogRef.close();
    }
}
