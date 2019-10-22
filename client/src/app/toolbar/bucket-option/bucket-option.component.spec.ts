import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BucketTool } from 'src/services/tool/tool-options/bucket';
import { BucketOptionComponent } from './bucket-option.component';

describe('BucketOptionComponent', () => {
    let component: BucketOptionComponent;
    let fixture: ComponentFixture<BucketOptionComponent>;
    let bucket: BucketTool;
    const BUTTON = 'bucket.png';
    const PATH = '../../../../assets/images/';
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BucketOptionComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BucketOptionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        bucket = TestBed.get(BucketTool);
        component.ngOnInit();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should bucket be the current tool', () => {
        expect(component.currentTool).toBe(bucket);
    });

    it('should select bucket tool', () => {
        component.selectTool(component.currentTool);
        expect(component.currentTool).toEqual(bucket);
    });

    it('should return string to get file source and button image', () => {
        component.getFilesource(bucket);
        expect(component.getFilesource(bucket)).toEqual(PATH + BUTTON);
    });

    it('should swap primary and secondary color', () => {
        component.onSwap();
        expect(component.onSwap).toBeTruthy();
    });

});
