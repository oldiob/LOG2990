import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PolyDessinComponent } from './poly-dessin.component';

describe('PolyDessinComponent', () => {
    let component: PolyDessinComponent;
    let fixture: ComponentFixture<PolyDessinComponent>;
    const keys = 'abcdefghijklmnopQRSTUVWXYZ';

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PolyDessinComponent],
            imports: [HttpClientModule],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PolyDessinComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should register state of changing display', () => {
        const displays: boolean[] = [true, false];
        displays.forEach((display: boolean) => {
            component.changeDisplay(display);
            expect(component.displayNewDrawing).toEqual(display);
        });
    });

    it('should register keypress events', () => {
        for (const k of keys) {
            const event = new KeyboardEvent('keypress', { key: k });
            component.onKeyPressed(event);
            expect(component.keyEvent).toBe(event);
            expect(component.key).toEqual(event.key);
        }
    });

    it('should register keydown events', () => {
        for (const k of keys) {
            const event = new KeyboardEvent('keydown', { key: k });
            component.onKeyDown(event);
            expect(component.keyEvent).toBe(event);
            expect(component.key).toEqual('');
        }
    });

});
