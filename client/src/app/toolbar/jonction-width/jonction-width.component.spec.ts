import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { JonctionComponent } from './jonction-width.component';

describe('JonctionComponent', () => {
    let component: JonctionComponent;
    let fixture: ComponentFixture<JonctionComponent>;
    const emmiter = jasmine.createSpyObj('EventEmitter<number>', ['emit']);
    const validWidth = 15;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [JonctionComponent],
            imports: [FormsModule],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(JonctionComponent);
        component = fixture.componentInstance;

        component.jonctionEmmiter = emmiter;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set a valid width', () => {
        component.jonctionWidth = validWidth;

        expect(component.jonctionWidth).toEqual(validWidth);
        expect(emmiter.emit).toHaveBeenCalledWith(validWidth);
    });

    it('should keep the valid width', () => {
        component.jonctionWidth = validWidth;
        component.jonctionWidth = 0;

        expect(component.jonctionWidth).toEqual(validWidth);
        expect(emmiter.emit).toHaveBeenCalledWith(validWidth);

        component.jonctionWidth = 50;

        expect(component.jonctionWidth).toEqual(validWidth);
        expect(emmiter.emit).toHaveBeenCalledWith(validWidth);
    });
});
