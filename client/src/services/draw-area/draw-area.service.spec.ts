import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadDrawingComponent } from 'src/app/popups/load-drawing/load-drawing.component';
import { Drawing } from '../draw-area/i-drawing';
import { DrawAreaService } from './draw-area.service';

describe('DrawAreaService', () => {

    let service: DrawAreaService;
    let drawing: Drawing;

    beforeEach(() => {
        TestBed.overrideModule(BrowserDynamicTestingModule, {
            set: {
                entryComponents: [
                    LoadDrawingComponent,
                ],
            },
        });
        TestBed.configureTestingModule({
            imports: [HttpClientModule, MatDialogModule, BrowserAnimationsModule, BrowserDynamicTestingModule],
            declarations: [LoadDrawingComponent],
            providers: [DrawAreaService],
        });

        service = jasmine.createSpyObj('DrawAreaService', ['save', 'dirty', 'upload']);

        drawing = {
            _id: '17',
            name: 'test',
            tags: ['allo'],
            holder: { entry: 'entry', elements: ['empty'] },
            backgroundColor: 'rgba(255, 255, 255, 1)',
            width: 200,
            height: 200,
        };
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should save the drawing', () => {
        service.save();
        expect(service.save).toHaveBeenCalled();
    });

    it('should mark the drawing as dirty', () => {
        service.dirty();
        expect(service.dirty).toHaveBeenCalled();
    });

    it('should upload the drawing', () => {
        service.upload(drawing);
        expect(service.upload).toHaveBeenCalled();
    });
});
