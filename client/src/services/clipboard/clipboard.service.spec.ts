import { HttpClient } from '@angular/common/http';
import { async, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MatSnackBarModule } from '@angular/material';
import { CmdService } from 'src/services/cmd/cmd.service';
import { SVGService } from 'src/services/svg/svg.service';
import { SelectorTool } from 'src/services/tool/tool-options/selector';
import { ClipboardService } from './clipboard.service';

fdescribe('ClipboardService', () => {
    let selector: SelectorTool;
    let svg: SVGService;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MatDialogModule, MatSnackBarModule],
            providers: [
                { provide: MatDialogRef },
                { provide: HttpClient },
                { provide: selector},
                { provide: svg}, ],
        })
            .compileComponents();
    }));
    beforeEach(() => {
      selector = jasmine.createSpyObj('SelectorTool', ['selected', 'nextOffset', 'reset']);
      TestBed.configureTestingModule({}); });

    it('should be created', () => {
        const service: ClipboardService = TestBed.get(ClipboardService);
        expect(service).toBeTruthy();
    });
    it('should copy correctly', () => {
        const service: ClipboardService = TestBed.get(ClipboardService);
        service.copy();
        expect(service.offset).toEqual([0, 0]);
    });
    it('should cut correctly', () => {
        const service: ClipboardService = TestBed.get(ClipboardService);
        service.cut();
        expect(selector.reset).toHaveBeenCalled();
        expect(service.offset).toEqual([0, 0]);
    });
    it('should paste correctly', () => {
        spyOn(CmdService, 'execute');
        const service: ClipboardService = TestBed.get(ClipboardService);
        service.paste();
        expect(CmdService.execute).toHaveBeenCalled();
    });
});
