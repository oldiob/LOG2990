import { TestBed } from '@angular/core/testing';

import { WorkZoneService } from './work-zone.service';

describe('WorkZoneService', () => {
    const WIDTH = 10;
    const HEIGHT = 10;
    const BACKGROUND_COLOR = '#000000';

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
            service.updateDrawAreaDimensions(WIDTH, HEIGHT, BACKGROUND_COLOR);
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
                (currentBgColor) => expect(currentBgColor).toBe(BACKGROUND_COLOR),
            );
        });
    });

    describe('updateInitialDimensions() method', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({});
            service = TestBed.get(WorkZoneService);
            service.updateInitialDimensions(WIDTH, HEIGHT);
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
            service.updateDrawAreaDimensions(WIDTH, HEIGHT, BACKGROUND_COLOR);
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
                (currentBgColor) => expect(currentBgColor).toBe(BACKGROUND_COLOR),
            );
        });
    });

    describe('draw area initial dimensions getter methods', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({});
            service = TestBed.get(WorkZoneService);
            service.updateInitialDimensions(WIDTH, HEIGHT);
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

        it('should update the background color correctly', () => {
            const color: string = `#${Math.floor(Math.random() * 0xFFFFFFFF).toString(16)}`;
            service.updateBackgroundColor(color);
            service.currentBackgroundColor.subscribe(
                (currentBgColor) => expect(currentBgColor).toEqual(color),
            );
        });

    });
});
