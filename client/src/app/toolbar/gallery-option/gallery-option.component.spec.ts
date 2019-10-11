import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryOptionComponent } from './gallery-option.component';

describe('GalleryOptionComponent', () => {
  let component: GalleryOptionComponent;
  let fixture: ComponentFixture<GalleryOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleryOptionComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
