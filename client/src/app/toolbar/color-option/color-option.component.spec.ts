import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorOptionComponent } from './color-option.component';

describe('ColorOptionComponent', () => {
    let component: ColorOptionComponent;
    let fixture: ComponentFixture<ColorOptionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ColorOptionComponent],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ColorOptionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should swap color correctly', () => {
        const primary: string = component.primary;
        const secondary: string = component.secondary;
        component.swap();
        expect(component.primary).toEqual(secondary);
        expect(component.secondary).toEqual(primary);
    });
});
