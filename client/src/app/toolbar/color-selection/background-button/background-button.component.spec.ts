import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundButtonComponent } from './background-button.component';

describe('BackgroundButtonComponent', () => {
  let component: BackgroundButtonComponent;
  let fixture: ComponentFixture<BackgroundButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackgroundButtonComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackgroundButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
