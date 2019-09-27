import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PaletteService } from 'src/services/palette/palette.service';
import { RectangleService } from 'src/services/rectangle/rectangle.service';
import { RectangleComponent } from './rectangle.component';

describe('RectangleComponent', () => {
    let component: RectangleComponent;
    let fixture: ComponentFixture<RectangleComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RectangleComponent],
            providers: [RectangleService, PaletteService],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RectangleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
