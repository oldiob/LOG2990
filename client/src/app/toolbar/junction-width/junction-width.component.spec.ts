import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { JunctionComponent } from './junction-width.component';

describe('JunctionComponent', () => {
    let component: JunctionComponent;
    let fixture: ComponentFixture<JunctionComponent>;
    const emmiter = jasmine.createSpyObj('EventEmitter<number>', ['emit']);
    const validWidth = 15;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [JunctionComponent],
            imports: [FormsModule],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(JunctionComponent);
        component = fixture.componentInstance;

        component.junctionEmmiter = emmiter;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set a valid width', () => {
        component.junctionWidth = validWidth;

        expect(component.junctionWidth).toEqual(validWidth);
        expect(emmiter.emit).toHaveBeenCalledWith(validWidth);
    });

    it('should keep the valid width', () => {
        component.junctionWidth = validWidth;
        component.junctionWidth = 0;

        expect(component.junctionWidth).toEqual(validWidth);
        expect(emmiter.emit).toHaveBeenCalledWith(validWidth);

        component.junctionWidth = 50;

        expect(component.junctionWidth).toEqual(validWidth);
        expect(emmiter.emit).toHaveBeenCalledWith(validWidth);
    });
});
