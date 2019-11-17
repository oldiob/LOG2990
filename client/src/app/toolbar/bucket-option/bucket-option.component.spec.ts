import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatSnackBarModule } from '@angular/material';
import { ColorApplicatorTool } from 'src/services/tool/tool-options/color-applicator';
import { DOMRenderer } from 'src/utils/dom-renderer';
import { BucketOptionComponent } from './bucket-option.component';

describe('BucketOptionComponent', () => {
    let component: BucketOptionComponent;
    let fixture: ComponentFixture<BucketOptionComponent>;
    let colorApplicator: ColorApplicatorTool;
    const BUTTON = 'color-applicator.png';
    const PATH = '../../../../assets/images/';
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BucketOptionComponent],
            imports: [MatDialogModule, MatSnackBarModule, HttpClientModule],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        const renderer = jasmine.createSpyObj('Renderer2',
            ['createElement', 'appendChild', 'setAttribute',
                'setAttributes', 'setStyle', 'removeChild']);
        DOMRenderer.renderer = renderer;

        fixture = TestBed.createComponent(BucketOptionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        colorApplicator = TestBed.get(ColorApplicatorTool);
        component.ngOnInit();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should bucket be the current tool', () => {
        expect(component.currentTool).toBe(colorApplicator);
    });

    it('should select bucket tool', () => {
        component.selectTool(component.currentTool);
        expect(component.currentTool).toEqual(colorApplicator);
    });

    it('should return string to get file source and button image', () => {
        component.getFilesource(colorApplicator);
        expect(component.getFilesource(colorApplicator)).toEqual(PATH + BUTTON);
    });

});
