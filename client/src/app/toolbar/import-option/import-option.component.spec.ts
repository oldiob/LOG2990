import { ImportOptionComponent } from './import-option.component';

describe('ImportOptionComponent', () => {
    let component: any;
    let work: any;
    let draw: any;
    let dialog: any;
    let dialogRef: any;

    beforeEach(() => {
        work = jasmine.createSpyObj('WorkZoneService', ['setFromDrawing']);
        draw = jasmine.createSpyObj('DrawAreaService', ['isSaved', 'save']);
        draw.isSaved = false;
        dialog = jasmine.createSpyObj('DialogService', ['openDialog']);
        dialogRef = jasmine.createSpyObj('DialogRef', ['afterClosed']);
        dialogRef.afterClosed.and.returnValue(jasmine.createSpyObj('any', ['subscribe']));
        dialog.openDialog.and.returnValue(dialogRef);
        component = new ImportOptionComponent(work, draw, dialog);
        component.ngOnInit();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should be enable if the form is valid and file is enable', () => {
        component.checkButton();
        expect(component.enable).toEqual(component.requiredForm.valid && component.enableFile);
    });

    it('should get file on keyboard event', () => {
        return; // TODO
    });

    it('should submit with a dialog', () => {
        draw.isSaved = false;
        component.submit(new MouseEvent('click'));
        expect(dialog.openDialog).toHaveBeenCalled();
    });

    it('should submit without a dialog', () => {
        draw.isSaved = true;
        spyOn(component, 'importOnArea');
        component.submit(new MouseEvent('click'));
        expect(component.importOnArea).toHaveBeenCalled();
        expect(draw.save).toHaveBeenCalled();
    });
});
