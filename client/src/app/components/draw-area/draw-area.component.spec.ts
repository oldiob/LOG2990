import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DrawAreaComponent } from './draw-area.component';

describe('DrawAreaComponent', () => {
    let component: DrawAreaComponent;
    let fixture: ComponentFixture<DrawAreaComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DrawAreaComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DrawAreaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
