import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material';
import { Drawing } from 'src/services/draw-area/i-drawing';
import { WorkZoneService } from 'src/services/work-zone/work-zone.service';
import { DrawAreaService } from './../../../services/draw-area/draw-area.service';

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

    readonly separatorKeysCodes: number[] = [ENTER, COMMA];
    tags: string[];

    saveForm: FormGroup;

    constructor(
        private drawAreaService: DrawAreaService,
        private formBuilder: FormBuilder,
        private workZoneService: WorkZoneService) {
    }

    ngOnInit() {
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
        this.saveForm.controls.name.setValue(DEFAULT_NAME);
        this.saveForm.controls.tags.setValue(DEFAULT_TAG);
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

    private areFieldsValid(): boolean {
        for (const tag of this.tags) {
            if (!(/^[a-zA-Z]+$/.test(tag))) {
                return false;
            }
        }
        return true;
    }

    getNameErrorMessage() {
        return this.saveForm.controls.name.hasError('required') ? 'You must enter a name' : '';
    }

    getTagsErrorMessage() {
        return this.saveForm.controls.name.hasError('required') ? 'You must enter valid tags' : '';
    }

    onSubmit() {
        if (this.areFieldsValid()) {
            const drawing: Drawing = this.workZoneService.getAsDrawing();

            drawing._id = null;
            drawing.name = this.saveForm.controls.name.value,
            drawing.tags = this.saveForm.controls.tags.value,

            this.drawAreaService.upload(drawing);
        }
    }
}
