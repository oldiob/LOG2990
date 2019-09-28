import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShapeOptionComponent } from './shape-option.component';

describe('ShapeOptionComponent', () => {
  let component: ShapeOptionComponent;
  let fixture: ComponentFixture<ShapeOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShapeOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShapeOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
