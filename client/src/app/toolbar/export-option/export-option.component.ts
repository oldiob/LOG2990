import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { SVGService } from 'src/services/svg/svg.service';
import { serializeDrawArea } from 'src/utils/element-parser';
import { saveFile, saveFileSVG} from 'src/utils/filesystem';
import { MyInjector } from 'src/utils/injector';

@Component({
  selector: 'app-export-option',
  templateUrl: './export-option.component.html',
  styleUrls: ['./export-option.component.scss'],
})
export class ExportOptionComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<ExportOptionComponent>) {
        //
    }

    ngOnInit(): void {
       //
    }
    saveDraw(): void {
        const fileData = JSON.stringify(serializeDrawArea(MyInjector.get(SVGService)));
        saveFile('lol_file', fileData);
    }

    saveSVG(): void {
        const fileData = JSON.stringify(serializeDrawArea(MyInjector.get(SVGService)));
        saveFileSVG('testSVG', fileData);
    }

    close(): void {
        this.dialogRef.close();
    }
}
