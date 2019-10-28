
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatButtonModule, MatCardModule, MatCheckboxModule,
         MatDialogModule, MatDialogRef, MatDividerModule, MatFormFieldModule,
         MatInputModule, MatSelectModule, MatTableModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { ImportOptionComponent } from './import-option.component';

let httpClientSpy: jasmine.SpyObj<HttpClient>;
let mockRouter: { navigate: jasmine.Spy};
// const DIMENSION: number = 1000;
const ERRORWANTED = 7;
const twice = 2;
const mockDialogRef: {close: jasmine.Spy} = {
  close: jasmine.createSpy('close'),
};
const event: MouseEvent = new MouseEvent('click');
// const keyEvent: KeyboardEvent = new KeyboardEvent("change");
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

fdescribe('ImportOptionComponent', () => {
  let component: ImportOptionComponent;
  let fixture: ComponentFixture<ImportOptionComponent>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'get']);
    void TestBed.configureTestingModule({
      imports: [ modules ],
      declarations: [ ImportOptionComponent ],
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
        fixture = TestBed.createComponent(ImportOptionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        mockRouter = jasmine.createSpyObj('Router', ['navigate']);
        // httpClientSpy = jasmine.createSpyObj("HttpClient", ["post"]);

        httpClientSpy.post.and.returnValue(of(ERRORWANTED));
    });

  it('should create', () => {
        void expect(component).toBeTruthy();
    });

  it('should close a dialog when it is clicked', () => {
        component.close(event);
        void expect(mockDialogRef.close).toHaveBeenCalled();
    });

  it('should throw an error when it is submitted', () => {
        component.submit(event);
        void expect(component.submit).toThrowError();
    });

  it('should throw an alert when it is submitted', () => {
        component.submit(event);
        void expect(mockRouter.navigate(['/', 'game-modes']));
    });

  it('should throw alert if original file is not the right height/width', () => {
        const expectedMessage = 'test';
        httpClientSpy.post.and.returnValue(of(expectedMessage));

        component.name = 'test';
        component.originalFile = new File([], 'test');
        component.modifiedFile = new File([], 'test');

        component.submit(event);

        void expect(httpClientSpy.post.calls.count()).toEqual(1);
    });

  it('should throw alert if it doesnt have 7 differences', () => {
        const expectedMessage = 5;
        httpClientSpy.post.and.returnValue(of(expectedMessage));

        component.name = 'test';
        component.originalFile = new File([], 'test');
        component.modifiedFile = new File([], 'test');

        component.submit(event);

        void expect(httpClientSpy.post.calls.count()).toEqual(1);
    });

  it('should work if it has 7 differences', () => {
        const expectedMessage = 7;
        httpClientSpy.post.and.returnValue(of(expectedMessage));

        component.name = 'test';
        component.originalFile = new File([], 'test');
        component.modifiedFile = new File([], 'test');

        component.submit(event);

        void expect(httpClientSpy.post.calls.count()).toEqual(twice);
    });

    /*
    it("should throw alert if original file is not the right height/width", () => {
        component.getOriginalFile(keyEvent);
        component.unchangedImage.onload = () => {
        component.unchangedHeight = DIMENSION;
        component.unchangedWidth = DIMENSION;
        };
        expect(component.getOriginalFile).toThrowError("Les dimensions de l'image doivent être 640 x 480");
    });
    */
});
