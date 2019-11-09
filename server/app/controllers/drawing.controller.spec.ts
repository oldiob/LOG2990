import { assert, expect } from 'chai';
import { Drawing } from '../../../client/src/services/draw-area/i-drawing';
import { DataBaseService } from '../services/database.service';
import { DrawingController } from './drawing.controller';

describe('DrawingRoutes :', () => {
    let drawingController: DrawingController;
    let database: DataBaseService;
    let validDrawing: Drawing;
    let invalidName: Drawing;
    let invalidTags: Drawing;
    invalidTags = {
      _id: '17',
      name: 'rebase',
      tags: ['123'],
      holder: { entry: 'entry', elements: ['vide'] },
      backgroundColor: '#ffffff',
      width: 200,
      height: 200,
    };
    validDrawing = {
        _id: '17',
        name: 'test',
        tags: ['allo'],
        holder: { entry: 'entry', elements: ['vide'] },
        backgroundColor: '#fffffff',
        width: 200,
        height: 200,
        };
    invalidName = {
          _id: '17',
          name: '',
          tags: ['allo'],
          holder: { entry: 'entry', elements: ['vide'] },
          backgroundColor: '#ffffff',
          width: 200,
          height: 200,
    };
    database = new DataBaseService();
    drawingController = new DrawingController(database);

    describe ('DrawingController function : ', () => {
        it('should complete this test', (done) => {
            assert.ok(true);
            done();
        });

        describe('isDrawingValid function:', () =>  {

            it('should return false if the drawing name is not valid', () => {
                    const invalidDrawingName = (drawingController as any).isDrawingValid(invalidName);
                    expect( invalidDrawingName).to.equal(false);
            });

            it('should return true if the drawing name is valid', () => {
                const validName = (drawingController as any).isDrawingValid(validDrawing);
                expect(validName).to.equal(true);
            });
        });

        describe('isTagValid function:', () =>  {
            it('should return false if the drawing tags is not valid', () => {
                    (drawingController as any).isTagValid(invalidTags);
                    expect( (drawingController as any).isTagValid(invalidTags)).equal(false);
            });

            it('should return true if the drawing tags is valid', () => {
                    (drawingController as any).isTagValid(validDrawing);
                    expect( (drawingController as any).isTagValid(validDrawing.tags)).equal(true);
            });
        });
    });
});
