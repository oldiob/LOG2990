import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule } from '@angular/forms';
import { AngleComponent } from './angle.component';

describe('AngleComponent', () => {
    let component: AngleComponent;
    let fixture: ComponentFixture<AngleComponent>;
    const emmiter = jasmine.createSpyObj('EventEmitter<number>', ['emit']);
    const validWidth = 15;

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

        component.widthEmmiter = emmiter;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set a valid angle', () => {
        component.width = validWidth;

        expect(component.width).toEqual(validWidth);
        expect(emmiter.emit).toHaveBeenCalledWith(validWidth);
    });

    it('should keep the valid angle', () => {
        component.width = validWidth;
        component.width = 0;

        expect(component.width).toEqual(validWidth);
        expect(emmiter.emit).toHaveBeenCalledWith(validWidth);

        component.width = 50;

        expect(component.width).toEqual(validWidth);
        expect(emmiter.emit).toHaveBeenCalledWith(validWidth);
    });
});
