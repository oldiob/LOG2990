import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Drawing } from 'src/services/draw-area/i-drawing';
import { SVGService } from 'src/services/svg/svg.service';
import { WorkZoneService } from 'src/services/work-zone/work-zone.service';
import { saveFile, saveFileSVG} from 'src/utils/filesystem';
import { MyInjector } from 'src/utils/injector';

@Component({
  selector: 'app-export-option',
  templateUrl: './export-option.component.html',
  styleUrls: ['./export-option.component.scss'],
})
export class ExportOptionComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<ExportOptionComponent>,
                private workZoneService: WorkZoneService) {
        //
    }

    ngOnInit(): void {
       //
    }
    // à enlever plus tard (same as save)
    saveDraw(): void {
        const drawing: Drawing = this.workZoneService.getAsDrawing();
        saveFile('lol_file', JSON.stringify(drawing));
    }

    saveSVG(): void {
        const drawing: Drawing = this.workZoneService.getAsDrawing();
        saveFileSVG('testSVG', JSON.stringify(drawing));
    }

    close(): void {
        this.dialogRef.close();
    }
}
