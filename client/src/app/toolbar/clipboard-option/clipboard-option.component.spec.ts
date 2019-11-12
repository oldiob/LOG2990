import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClipboardOptionComponent } from './clipboard-option.component';

describe('ClipboardOptionComponent', () => {
  let component: ClipboardOptionComponent;
  let fixture: ComponentFixture<ClipboardOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClipboardOptionComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClipboardOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
