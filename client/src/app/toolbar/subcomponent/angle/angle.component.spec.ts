import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule } from '@angular/forms';
import { AngleComponent } from './angle.component';

describe('AngleComponent', () => {
    let component: AngleComponent;
    let fixture: ComponentFixture<AngleComponent>;
    const notValidAngle = 500;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AngleComponent],
            imports: [FormsModule],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AngleComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should keep the valid angle', () => {
        component.angle = component.MIN_ANGLE;

        expect(component.angle).toEqual(component.MIN_ANGLE);

        component.angle = component.MAX_ANGLE;

        expect(component.angle).toEqual(component.MAX_ANGLE);
    });

    it('should not keep the valid angle', () => {
        component.angle = notValidAngle;
    });
});
