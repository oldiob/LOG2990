import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexService } from 'src/app/services/index/index.service';
import { PolyDessinComponent } from './poly-dessin.component';

describe('PolyDessinComponent', () => {
  let component: PolyDessinComponent;
  let fixture: ComponentFixture<PolyDessinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolyDessinComponent ],
      providers: [IndexService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolyDessinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('#changeDisplay(display) should change #displayNewDrawing', () => {
    component.changeDisplay(true);
    expect(component.displayNewDrawing).toBe(true, 'true when set to true');
    component.changeDisplay(false);
    expect(component.displayNewDrawing).toBe(true, 'false when set to false');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
