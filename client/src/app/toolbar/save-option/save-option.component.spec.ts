import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSnackBarModule } from '@angular/material';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
    });

    it('should create', () => {
        expect(component).toBeTruthy();
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
        component.toggleLocal();
        expect(component.isLocal).toBeFalsy();
    });
});
