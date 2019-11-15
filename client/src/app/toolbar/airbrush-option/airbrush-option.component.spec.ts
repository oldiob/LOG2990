import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirbrushOptionComponent } from './airbrush-option.component';

describe('AirbrushOptionComponent', () => {
  let component: AirbrushOptionComponent;
  let fixture: ComponentFixture<AirbrushOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirbrushOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirbrushOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
