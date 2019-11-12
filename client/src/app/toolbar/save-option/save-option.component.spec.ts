import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipInputEvent, MatChipsModule,
         MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSnackBarModule } from '@angular/material';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WorkZoneService } from 'src/services/work-zone/work-zone.service';
import { MyInjector } from 'src/utils/injector';
import { SaveOptionComponent } from './save-option.component';
// import { Drawing } from 'src/services/draw-area/i-drawing';

fdescribe('SaveOptionComponent', () => {
    let component: SaveOptionComponent;
    let fixture: ComponentFixture<SaveOptionComponent>;
    let workZoneService: WorkZoneService;
    // const entry = jasmine.createSpyObj('ElementRef', ['nativeElement']);
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MatFormFieldModule, MatDialogModule, MatSnackBarModule, MatChipsModule, FormsModule,
                BrowserDynamicTestingModule, BrowserAnimationsModule,
                MatIconModule, MatInputModule, ReactiveFormsModule, HttpClientModule],
            declarations: [SaveOptionComponent],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SaveOptionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        MyInjector.injector = jasmine.createSpyObj('Injector', ['get']);
        workZoneService = jasmine.createSpyObj('WorkZoneService', ['getAsDrawing']);
        (component as any).workZoneService = workZoneService;
        component.ngOnInit();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should create form', () => {
        (component as any).createForm();
        expect(component.saveForm.controls.name.value).toEqual('Untitled');
        expect(component.saveForm.controls.tags.value).toEqual([]);
    });

    it('should add tag', () => {
        const inputTest = (component as any).input as HTMLInputElement;
        const valueTest = (component as any).value;
        const event: MatChipInputEvent = {
            input: inputTest,
            value: valueTest,
        };
        component.add(event);
    });

    it('should remove tag', () => {
        component.tags = ['test', 'allo'];
        component.remove('test');
        expect(component.saveForm.controls.tags.value).toEqual(['allo']);
    });

    it('should return false if the tag is invalid', () => {
        component.tags = ['123'];
        const bool: boolean = (component as any).areFieldsValid();
        expect(bool).toBeFalsy();
    });

    it('should return true if the tag is valid', () => {
        component.tags = ['test'];
        const bool: boolean = (component as any).areFieldsValid();
        expect(bool).toBeTruthy();
    });

    it('should not get name error message', () => {
        expect(component.getNameErrorMessage()).toBe('');
    });

    it('should not get tags error message', () => {
        expect(component.getTagsErrorMessage()).toBe('');
    });

    it('should get name error message', () => {
        component.saveForm.controls.name.setValue('');
        expect(component.getNameErrorMessage()).toBe('You must enter a name');
    });

    it('should get tags error message', () => {
        component.saveForm.controls.name.setValue('');
        expect(component.getTagsErrorMessage()).toBe('You must enter valid tags');
    });

    // it('should on submit upload drawing', () => {
    //     component.tags = ['test'];
    //     (component as any).areFieldsValid();
    //     // const drawingTest = (component as any).drawing;
    //     const drawingTest: Drawing = (component as any).workZoneService.getAsDrawing();
    //     // (component as any).workZoneService.getAsDrawing() = drawingTest;
    //     drawingTest._id = workZoneService.getAsDrawing()._id;
    //     component.onSubmit();
    //     expect((component as any).drawing).toEqual(drawingTest);
    // });

    it('should toggle to save locally', () => {
        component.toggleOnline();
        expect(component.isOnline).toBeTruthy();
    });

    it('should toggle to save in the server', () => {
        component.isOnline = true;
        component.toggleOnline();
        expect(component.isOnline).toBeFalsy();
    });
});
