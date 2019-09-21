import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PolyDessinComponent } from './poly-dessin.component';

describe('PolyDessinComponent', () => {
    let component: PolyDessinComponent;
    let fixture: ComponentFixture<PolyDessinComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PolyDessinComponent],
            imports: [ HttpClientModule],
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
});
