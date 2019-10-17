import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material';
import { Drawing } from 'src/services/draw-area/i-drawing';
import { SVGService } from 'src/services/svg/svg.service';
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
        private svgService: SVGService,
        private formBuilder: FormBuilder) { }

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
        // ! Refactor following when server implemented
        const DEEP_COPY = true;
        const preview = this.svgService.entry.nativeElement.cloneNode(DEEP_COPY) as SVGElement;

        const drawing: Drawing = {
            name: this.saveForm.controls.name.value,
            thumbnail: preview,
            tags: this.saveForm.controls.tags.value,
            svgs: [''],
        };
        this.drawAreaService.save(drawing);
    }
}
