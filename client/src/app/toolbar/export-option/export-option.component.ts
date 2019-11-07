import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { SVGService } from 'src/services/svg/svg.service';
import { saveFile } from 'src/utils/filesystem';

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
        saveFile('testSVG', JSON.stringify(this.svgService.entry.nativeElement.outerHTML), 'svg');
    }

    close(): void {
        this.dialogRef.close();
    }
}
