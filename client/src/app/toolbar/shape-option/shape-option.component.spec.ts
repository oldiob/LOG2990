import { CUSTOM_ELEMENTS_SCHEMA, ElementRef } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShowcaseComponent } from '../showcase/showcase.component';
import { ShapeOptionComponent } from './shape-option.component';

fdescribe('ShapeOptionComponent', () => {
  let component: ShapeOptionComponent;
  let fixture: ComponentFixture<ShapeOptionComponent>;
  let showcase: ShowcaseComponent;
  let entry: ElementRef;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShapeOptionComponent ],
      imports: [FormsModule, ReactiveFormsModule, BrowserAnimationsModule,
                BrowserDynamicTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShapeOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    showcase = jasmine.createSpyObj('ShowcaseComponent', ['display']);
    entry = jasmine.createSpyObj('ElementRef', ['']);

    component.showcase = showcase;
    component.showcase.entry = entry;

    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should rectangle be the current tool', () => {
    expect(component.currentTool).toBe(component.tools[0]);
  });
});
