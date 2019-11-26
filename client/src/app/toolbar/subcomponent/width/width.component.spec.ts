import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WidthComponent } from './width.component';

describe('WidthComponent', () => {
    let component: WidthComponent;
    let fixture: ComponentFixture<WidthComponent>;
    const emmiter = jasmine.createSpyObj('EventEmitter<number>', ['emit']);
    const validWidth = 15;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [WidthComponent],
            imports: [FormsModule],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WidthComponent);
        component = fixture.componentInstance;

        component.widthEmmiter = emmiter;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set a valid width', () => {
        component.width = validWidth;

        expect(component.width).toEqual(validWidth);
        expect(emmiter.emit).toHaveBeenCalledWith(validWidth);
    });

    it('should keep the valid width', () => {
        component.width = validWidth;
        component.width = 0;

        expect(component.width).toEqual(validWidth);
        expect(emmiter.emit).toHaveBeenCalledWith(validWidth);

        component.width = 50;

        expect(component.width).toEqual(validWidth);
        expect(emmiter.emit).toHaveBeenCalledWith(validWidth);
    });
});
