import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
    MatChipsModule, MatDialogModule, MatFormFieldModule,
    MatIconModule, MatInputModule, MatSelectModule, MatSnackBarModule
} from '@angular/material';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { saveFile } from 'src/utils/filesystem';
import { ExportOptionComponent } from './export-option.component';

describe('ExportOptionComponent', () => {
    let component: ExportOptionComponent;
    let fixture: ComponentFixture<ExportOptionComponent>;
    let selectExportTest: string[];
    const entry = jasmine.createSpyObj('ElementRef', ['nativeElement']);
    let formBuilder: FormBuilder;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MatFormFieldModule, MatDialogModule, MatSnackBarModule, MatChipsModule, FormsModule,
                BrowserDynamicTestingModule, BrowserAnimationsModule,
                MatIconModule, MatInputModule, ReactiveFormsModule, HttpClientModule, MatSelectModule],
            declarations: [ExportOptionComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ExportOptionComponent);
        component = fixture.componentInstance;
        formBuilder = TestBed.get(FormBuilder);
        fixture.detectChanges();
        (component as any).formbuilder = formBuilder;
        selectExportTest = ['svg', 'png', 'jpg', 'bmp'];
        (component as any).svgService.entry = entry;

        const DEFAULT_NAME = 'Untitled';
        const validators = [Validators.required];
        const DEFAULT_EXPORT = selectExportTest[0];
        component.exportForm = (component as any).formBuilder.group({
            name: [DEFAULT_NAME, validators],
            export: [DEFAULT_EXPORT, validators],
        });
        component.exportForm.controls.name.setValue(DEFAULT_NAME);
        component.exportForm.controls.export.setValue(DEFAULT_EXPORT);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should save as svg', () => {
        component.saveAsSVG();
        expect(saveFile).toBeTruthy();
    });

    it('should not get name error message', () => {
        expect(component.getNameErrorMessage()).toBe('');
    });

    it('should get name error message', () => {
        component.exportForm.controls.name.setValue('');
        expect(component.getNameErrorMessage()).toBe('You must enter a name');
    });

    it('should return true if the form is valid', () => {
        component.checkButton();
        expect(component.isEnabled).toBeTruthy();
    });

    it('should return false if the form is not valid', () => {
        component.exportForm.controls.name.setValue('');
        component.checkButton();
        expect(component.isEnabled).toBeFalsy();
    });

    it('should on click select svg', () => {
        component.exportForm.controls.export.setValue(component.exportTypes[0]);
        component.onClick();
        expect(component.exportTypes[0]).toEqual(selectExportTest[0]);
    });

    it('should on click select png', () => {
        component.exportForm.controls.export.setValue(component.exportTypes[1]);
        expect(component.exportTypes[1]).toEqual(selectExportTest[1]);
    });

    it('should on click select jpg', () => {
        component.exportForm.controls.export.setValue(component.exportTypes[2]);
        component.onClick();
        expect(component.exportTypes[2]).toEqual(selectExportTest[2]);
    });

    it('should on click select bmp', () => {
        component.exportForm.controls.export.setValue(component.exportTypes[3]);
        component.onClick();
        expect(component.exportTypes[3]).toEqual(selectExportTest[3]);
    });

    it('should submit save as svg', () => {
        spyOn(component, 'saveAsSVG');
        component.selectedExport = component.exportTypes[0];
        component.submit();
        expect(component.saveAsSVG).toHaveBeenCalled();
    });

    it('should submit save as png', () => {
        spyOn(component, 'saveAsPNG');
        component.selectedExport = component.exportTypes[1];
        component.submit();
        expect(component.saveAsPNG).toHaveBeenCalled();
    });

    it('should submit save as jpg', () => {
        spyOn(component, 'saveAsJPG');
        component.selectedExport = component.exportTypes[2];
        component.submit();
        expect(component.saveAsJPG).toHaveBeenCalled();
    });

    it('should submit save as bmp', () => {
        spyOn(component, 'saveAsBMP');
        component.selectedExport = component.exportTypes[3];
        component.submit();
        expect(component.saveAsBMP).toHaveBeenCalled();
    });

    it('should create a name form input', () => {
        (component as any).createExportForm();
        expect(component.exportForm.contains('name')).toBeTruthy();
    });

});
