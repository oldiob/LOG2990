import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadDrawingComponent } from './load-drawing.component';

describe('LoadDrawingComponent', () => {
  let component: LoadDrawingComponent;
  let fixture: ComponentFixture<LoadDrawingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadDrawingComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadDrawingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isDone to true', () => {
    component.done();
    expect(component.isDone).toBeTruthy();
  });
});
