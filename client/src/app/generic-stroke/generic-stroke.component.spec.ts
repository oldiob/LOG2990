import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericStrokeComponent } from './generic-stroke.component';

describe('GenericStrokeComponent', () => {
  let component: GenericStrokeComponent;
  let fixture: ComponentFixture<GenericStrokeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericStrokeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericStrokeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
