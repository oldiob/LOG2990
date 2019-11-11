import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule, MatDialogModule,
         MatFormFieldModule, MatIconModule, MatInputModule, MatSnackBarModule } from '@angular/material';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyInjector } from 'src/utils/injector';
import { SaveOptionComponent } from './save-option.component';

describe('SaveOptionComponent', () => {
    let component: SaveOptionComponent;
    let fixture: ComponentFixture<SaveOptionComponent>;

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
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should create form', () => {
        (component as any).createForm();
        expect(component.saveForm.controls.name.value).toEqual('Untitled');
        expect(component.saveForm.controls.tags.value).toEqual([]);
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
