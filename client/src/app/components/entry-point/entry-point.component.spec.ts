import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatCheckboxModule, MatDialogModule, MatDialogRef, MatDividerModule } from '@angular/material';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EntryPointComponent } from './entry-point.component';

describe('EntryPointComponent', () => {
  let component: EntryPointComponent;
  let fixture: ComponentFixture<EntryPointComponent>;
  const mockDialogRefSpy: {close: jasmine.Spy} = {
    close: jasmine.createSpy('close'),
  };
  const windowSpy: {reload: jasmine.Spy} = {
    reload: jasmine.createSpy('reload'),
  };
  const eventClick: MouseEvent = new MouseEvent('click');
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatDividerModule, MatCheckboxModule, BrowserAnimationsModule, BrowserDynamicTestingModule,
      MatDialogModule],
      declarations: [ EntryPointComponent ],
      providers: [{provide: MatDialogRef, useValue: mockDialogRefSpy},
                 {provide: Window, useValue: windowSpy},
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog when it is clicked', () => {
    component.close(eventClick);
    expect(mockDialogRefSpy.close).toHaveBeenCalled();
  });

  it('should return false when the dialog is closed', () => {
    component.close(eventClick);
    expect(component.pressHide).toEqual(false);
  });

  it('should return true when the disable button is clicked', () => {
    component.pressHide = true;
    component.close(eventClick);
    expect(component.pressHide).toEqual(true);
  });

  it('should return true when the disable button is clicked and when the page is refreshed', () => {
    component.pressHide = true;
    component.close(eventClick);
    windowSpy.reload();
    expect(component.pressHide).toEqual(true);
  });

  it('should return false if the keyboard is not pressed', () => {
    const event = new KeyboardEvent('keypress', {
      key: '',
      cancelable: true,
    });
    expect(event.defaultPrevented).toEqual(false);
  });

  it('should return true if the keyboard is pressed', () => {
    const event = new KeyboardEvent('keypress', {
      key: 'd',
      cancelable: true,
    });
    component.disableKeyboard(event);
    expect(event.defaultPrevented).toEqual(true);
  });

});
