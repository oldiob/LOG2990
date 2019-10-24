import { expect } from 'chai';
import { Drawing } from '../../../client/src/services/draw-area/i-drawing';
import { DateService } from '../services/date.service';
import { DrawingRoute } from './drawing.route';

describe('DrawingRoutes :', () => {
    let drawingRoute: DrawingRoute;
    let dataService: DateService;
    let invalidID: Drawing;
    let validDrawing: Drawing;
    let invalidName: Drawing;
    let invalidTags: Drawing;
    invalidTags = {
      id: 17,
      name: 'rebase',
      tags: ['123'],
      holder: { entry: 'entry', elements: ['vide'] },
      backgroundColor: '#ffffff',
      width: 200,
      height: 200,
    };
    invalidID = {
        id: -1,
        name: 'test',
        tags: ['allo'],
        holder: { entry: 'entry', elements: ['vide'] },
        backgroundColor: '#ffffff',
        width: 200,
        height: 200,
    };
    validDrawing = {
        id: 17,
        name: 'test',
        tags: ['allo'],
        holder: { entry: 'entry', elements: ['vide'] },
        backgroundColor: '#ffffff',
        width: 200,
        height: 200,
        };
    invalidName = {
          id: 17,
          name: '',
          tags: ['allo'],
          holder: { entry: 'entry', elements: ['vide'] },
          backgroundColor: '#ffffff',
          width: 200,
          height: 200,
    };
    dataService = new DateService();
    drawingRoute = new DrawingRoute(dataService);
    describe('assignID function: ', () => {
        it('should assignID to drawing', () => {
            expect(drawingRoute.assignID(validDrawing)).equal(-1);
        });

        it('should assignID of -1 to 0 to drawing', () => {
            expect(drawingRoute.assignID(invalidID)).equal(0);
        });
    });

    describe('isDrawingValid function: ', () => {

        it('should return true if the drawing is valid', () => {
            drawingRoute.isDrawingValid(validDrawing);
            expect(drawingRoute.isDrawingValid(validDrawing)).equal(true);
        });

        it('should return false if the drawing name is not valid', () => {
            drawingRoute.isDrawingValid(invalidName);
            expect(drawingRoute.isDrawingValid(invalidName)).equal(false);
        });

        it('should return false if the drawing tags is not valid', () => {
            drawingRoute.isDrawingValid(invalidTags);
            expect(drawingRoute.isDrawingValid(invalidTags)).equal(false);
        });

    });
    describe('findDrawing function: ', () => {

        it('should return null if the drawing is not found', () => {
            const ID = 1;
            drawingRoute.findDrawing(ID);
            expect(drawingRoute.findDrawing(ID)).equal(null);
        });

    });

    describe('getDrawingIndex function: ', () => {

        it('should return -1 if it gets the drawing index', () => {
            const ID = 17;
            drawingRoute.getDrawingIndex(ID);
            expect(drawingRoute.getDrawingIndex(ID)).equal(-1);
        });
    });

});
