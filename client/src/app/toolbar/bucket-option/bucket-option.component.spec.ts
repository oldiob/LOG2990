import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BucketOptionComponent } from './bucket-option.component';

describe('BucketOptionComponent', () => {
  let component: BucketOptionComponent;
  let fixture: ComponentFixture<BucketOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BucketOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BucketOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
