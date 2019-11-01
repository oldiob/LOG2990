
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatButtonModule, MatCardModule, MatCheckboxModule,
         MatDialogModule, MatDialogRef, MatDividerModule, MatFormFieldModule,
         MatInputModule, MatSelectModule, MatTableModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { ImportComponent } from './import.component';

let httpClientSpy: jasmine.SpyObj<HttpClient>;
let mockRouter: { navigate: jasmine.Spy};
const mockDialogRef: {close: jasmine.Spy} = {
  close: jasmine.createSpy('close'),
};
const event: MouseEvent = new MouseEvent('click');
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
            HttpClientModule,
];

describe('ImportComponent', () => {
  let component: ImportComponent;
  let fixture: ComponentFixture<ImportComponent>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'get']);
    void TestBed.configureTestingModule({
      imports: [ modules ],
      declarations: [ ImportComponent ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: matDialogdataSpy },
        { provide: Router, useValue: mockRouter},
        { provide: HttpClient, useValue: httpClientSpy},
      ],
    })
        .compileComponents();

  });

  beforeEach(() => {
        fixture = TestBed.createComponent(ImportComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    });

  it('should create', () => {
        void expect(component).toBeTruthy();
    });

  it('should close a dialog when it is clicked', () => {
        component.close(event);
        void expect(mockDialogRef.close).toHaveBeenCalled();
    });
});
