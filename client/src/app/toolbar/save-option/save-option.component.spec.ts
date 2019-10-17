import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveOptionComponent } from './save-option.component';

describe('SaveOptionComponent', () => {
  let component: SaveOptionComponent;
  let fixture: ComponentFixture<SaveOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveOptionComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
