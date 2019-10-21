import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material';
import { DialogService } from 'src/services/dialog/dialog.service';
import { Drawing } from 'src/services/draw-area/i-drawing';
import { SVGService } from 'src/services/svg/svg.service';
import { DrawAreaService } from './../../../services/draw-area/draw-area.service';
import { serializeDrawArea, DrawAreaHolder } from 'src/utils/element-parser';
import { WorkZoneService } from 'src/services/work-zone/work-zone.service';

@Component({
    selector: 'app-save-option',
    templateUrl: './save-option.component.html',
    styleUrls: ['./save-option.component.scss'],
})
export class SaveOptionComponent implements OnInit {

    visible: boolean;
    selectable: boolean;
    removable: boolean;
    addOnBlur: boolean;

    drawingHeight: number;
    drawingWidth: number;
    drawingBackgroundColor: string;

    readonly separatorKeysCodes: number[] = [ENTER, COMMA];
    tags: string[];

    saveForm: FormGroup;

    constructor(
        private dialogService: DialogService,
        private drawAreaService: DrawAreaService,
        private svgService: SVGService,
        private formBuilder: FormBuilder,
        workZoneService: WorkZoneService) {
            workZoneService.currentHeight.subscribe(
                (height): number => {
                    this.drawingHeight = height;
                    return height;
                },
            );
            workZoneService.currentWidth.subscribe(
                (width): number => {
                    this.drawingWidth = width;
                    return width;
                },
            );
            workZoneService.currentBackgroundColor.subscribe(
                (color): string => {
                    this.drawingBackgroundColor = color;
                    return color;
                },
            );
         }

    ngOnInit() {
        this.dialogService.disableKey();
        this.visible = true;
        this.selectable = true;
        this.removable = true;
        this.addOnBlur = true;
        this.tags = [];
        this.createForm();
    }

    private createForm(): void {
        const DEFAULT_NAME = 'Untitled';
        const DEFAULT_TAG: string[] = [];
        const validators = [Validators.required];

        this.saveForm = this.formBuilder.group({
            name: [DEFAULT_NAME, validators],
            tags: [DEFAULT_TAG],
        });
    }

    add(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;

        if ((value || '').trim()) {
            this.tags.push(value.trim());
        }
        if (input) {
            input.value = '';
        }
        this.saveForm.controls.tags.setValue(this.tags);
    }

    remove(tag: string): void {
        const index = this.tags.indexOf(tag);
        if (index >= 0) {
            this.tags.splice(index, 1);
        }
        this.saveForm.controls.tags.setValue(this.tags);
    }

    // TODO: Upload drawing (name: string, tag: string[], thumbnail: JPEG) to server
    upload(drawing: Drawing) {
        //
    }

    onSubmit() {
        const drawAreaHolder: DrawAreaHolder = serializeDrawArea(this.svgService);
        this.svgService.clearDrawArea();

        const drawing: Drawing = {
            id: -1,

            name: this.saveForm.controls.name.value,
            tags: this.saveForm.controls.tags.value,
            holder: drawAreaHolder,

            backgroundColor: this.drawingBackgroundColor,
            width: this.drawingWidth,
            height: this.drawingHeight,
        };

        this.drawAreaService.save(drawing);
        this.dialogService.enableKey();
    }

    onClose() {
        this.dialogService.enableKey();
    }
}
