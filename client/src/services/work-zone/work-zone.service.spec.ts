import { TestBed } from '@angular/core/testing';

import { Color } from 'src/utils/color';
import { WorkZoneService } from './work-zone.service';

describe('WorkZoneService', () => {
    const WIDTH = 10;
    const HEIGHT = 10;
    const backgroundColor = new Color(255, 255, 255, 1);

    let service: WorkZoneService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
    });

    it('should be created', () => {
        service = TestBed.get(WorkZoneService);
        expect(service).toBeTruthy();
    });

    describe('updateDrawAreaDimensions() method', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({});
            service = TestBed.get(WorkZoneService);
            service.updateDrawAreaProperties(WIDTH, HEIGHT, backgroundColor.toRGBA());
        });

        it('should update draw area width', () => {
            service.currentHeight.subscribe(
                (currentHeight) => expect(currentHeight).toBe(WIDTH),
            );
        });

        it('should update draw area height', () => {
            service.currentHeight.subscribe(
                (currentHeight) => expect(currentHeight).toBe(HEIGHT),
            );
        });

        it('should update draw area background color', () => {
            service.currentBackgroundColor.subscribe(
                (currentBgColor: Color) => expect(currentBgColor).toEqual(backgroundColor),
            );
        });
    });

    describe('updateInitialDimensions() method', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({});
            service = TestBed.get(WorkZoneService);
            service.updateMaxDimensions(WIDTH, HEIGHT);
        });

        it('should update draw area width', () => {
            service.currentMaxWidth.subscribe(
                (currentMaxWidth) => expect(currentMaxWidth).toBe(WIDTH),
            );
        });

        it('should update draw area height', () => {
            service.currentMaxHeight.subscribe(
                (currentMaxHeight) => expect(currentMaxHeight).toBe(HEIGHT),
            );
        });
    });

    describe('draw area current dimensions getter methods', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({});
            service = TestBed.get(WorkZoneService);
            service.updateDrawAreaProperties(WIDTH, HEIGHT, backgroundColor.toRGBA());
        });

        it('should give access to DrawArea current width', () => {
            service.currentWidth.subscribe(
                (currentWidth) => expect(currentWidth).toBe(WIDTH),
            );
        });

        it('should give access to DrawArea current height', () => {
            service.currentHeight.subscribe(
                (currentHeight) => expect(currentHeight).toBe(HEIGHT),
            );
        });

        it('should give access to DrawArea current background color', () => {
            service.currentBackgroundColor.subscribe(
                (currentBgColor: Color) => expect(currentBgColor).toEqual(backgroundColor),
            );
        });
    });

    describe('draw area initial dimensions getter methods', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({});
            service = TestBed.get(WorkZoneService);
            service.updateMaxDimensions(WIDTH, HEIGHT);
        });

        it('should give access to draw area default width', () => {
            service.currentMaxWidth.subscribe(
                (currentMaxWidth) => expect(currentMaxWidth).toBe(WIDTH),
            );
        });

        it('should give access to DrawArea default height', () => {
            service.currentMaxHeight.subscribe(
                (currentMaxHeight) => expect(currentMaxHeight).toBe(HEIGHT),
            );
        });

    });
});
