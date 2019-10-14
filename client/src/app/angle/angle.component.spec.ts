import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule } from '@angular/forms';
import { AngleComponent } from './angle.component';

describe('AngleComponent', () => {
    let component: AngleComponent;
    let fixture: ComponentFixture<AngleComponent>;
    const emmiter = jasmine.createSpyObj('EventEmitter<number>', ['emit']);
    const validAngle = 15;

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

        component.angleEmmiter = emmiter;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set a valid angle', () => {
        component.angle = validAngle;

        expect(component.angle).toEqual(validAngle);
        expect(emmiter.emit).toHaveBeenCalledWith(validAngle);
    });

    it('should keep the valid angle', () => {
        component.angle = validAngle;
        component.angle = 0;

        expect(component.angle).toEqual(validAngle);
        expect(emmiter.emit).toHaveBeenCalledWith(validAngle);

        component.angle = 50;

        expect(component.angle).toEqual(validAngle);
        expect(emmiter.emit).toHaveBeenCalledWith(validAngle);
    });
});
