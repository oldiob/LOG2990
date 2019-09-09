import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolyDessinComponent } from './poly-dessin.component';

describe('PolyDessinComponent', () => {
  let component: PolyDessinComponent;
  let fixture: ComponentFixture<PolyDessinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolyDessinComponent ]
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
