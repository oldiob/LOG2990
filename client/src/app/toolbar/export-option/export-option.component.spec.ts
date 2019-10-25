import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExportOptionComponent } from './export-option.component';

describe('ExportOptionComponent', () => {
  let component: ExportOptionComponent;
  let fixture: ComponentFixture<ExportOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MatFormFieldModule, MatDialogModule, MatChipsModule, FormsModule, BrowserDynamicTestingModule, BrowserAnimationsModule,
      MatIconModule, MatInputModule, ReactiveFormsModule, HttpClientModule ],
      declarations: [ ExportOptionComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
