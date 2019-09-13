import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatCheckboxModule, MatDialogModule, MatDialogRef, MatDividerModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EntryPointComponent } from './entry-point.component';

fdescribe('EntryPointComponent', () => {
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
      imports: [MatDividerModule, MatCheckboxModule, BrowserAnimationsModule,
      MatDialogModule],
      declarations: [ EntryPointComponent ],
      providers: [{provide: MatDialogRef, useValue: mockDialogRefSpy},
                 {provide: Window, useValue: windowSpy},
      ],
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
    expect(component.enableButton).toEqual(false);
  });

  it('should return true when the disable button is clicked', () => {
    component.checkButton(eventClick);
    component.close(eventClick);
    expect(component.enableButton).toEqual(true);
  });

  it('should return true when the disable button is clicked and when the page is refreshed', () => {
    component.checkButton(eventClick);
    component.close(eventClick);
    windowSpy.reload();
    expect(component.enableButton).toEqual(true);
  });

});
