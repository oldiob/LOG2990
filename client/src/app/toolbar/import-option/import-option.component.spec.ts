
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatButtonModule, MatCardModule, MatCheckboxModule,
         MatDialogModule, MatDialogRef, MatDividerModule, MatFormFieldModule,
         MatInputModule, MatSelectModule, MatSnackBarModule, MatTableModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ImportOptionComponent } from './import-option.component';

const mockDialogRef: {close: jasmine.Spy} = {
  close: jasmine.createSpy('close'),
};
const matDialogdataSpy: jasmine.Spy = jasmine.createSpy('MAT_DIALOG_DATA');

const modules: (typeof MatDialogModule)[] = [
            MatDialogModule,
            MatDividerModule,
            MatTableModule,
            MatInputModule,
            MatSelectModule,
            MatFormFieldModule,
            MatCardModule,
            MatDialogModule,
            MatButtonModule,
            MatCheckboxModule,
            BrowserAnimationsModule,
            FormsModule,
            ReactiveFormsModule,
            MatSnackBarModule,
            HttpClientModule,
];

describe('ImportOptionComponent', () => {
  let component: ImportOptionComponent;
  let fixture: ComponentFixture<ImportOptionComponent>;

  beforeEach(() => {
    void TestBed.configureTestingModule({
      imports: [ modules ],
      declarations: [ ImportOptionComponent ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: matDialogdataSpy },
      ],
    })
        .compileComponents();

  });

  beforeEach(() => {
        fixture = TestBed.createComponent(ImportOptionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

  it('should create', () => {
        void expect(component).toBeTruthy();
    });
});
