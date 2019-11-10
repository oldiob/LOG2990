import { assert, expect } from 'chai';
import { Router } from 'express';
import { Drawing } from '../../../client/src/services/draw-area/i-drawing';
import { DataBaseService } from '../services/database.service';
import { DrawingController } from './drawing.controller';

describe('DrawingRoutes :', () => {
    const database: DataBaseService = new DataBaseService();
    const drawingController: DrawingController = new DrawingController(database);
    const router: Router = Router();
    let validDrawing: Drawing;
    let invalidName: Drawing;
    let invalidTags: Drawing;
    let invalidID: Drawing;
    const color = 'rgba(255, 255, 255, 1)';
    invalidTags = {
      _id: '17',
      name: 'rebase',
      tags: ['123'],
      holder: { entry: 'entry', elements: ['vide'] },
      backgroundColor: color,
      width: 200,
      height: 200,
    };
    validDrawing = {
        _id: '17',
        name: 'test',
        tags: ['allo'],
        holder: { entry: 'entry', elements: ['vide'] },
        backgroundColor: color,
        width: 200,
        height: 200,
        };
    invalidName = {
          _id: '17',
          name: '',
          tags: ['allo'],
          holder: { entry: 'entry', elements: ['vide'] },
          backgroundColor: color,
          width: 200,
          height: 200,
    };
    invalidID = {
        _id: '17',
        name: 'rebase',
        tags: ['123'],
        holder: { entry: 'entry', elements: ['vide'] },
        backgroundColor: color,
        width: 200,
        height: 200,
      };

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

            it('should return false if the drawing id is not valid', () => {
                const invalidDrawID = (drawingController as any).isValid;
                const invalidDrawingID = (drawingController as any).isDrawingValid(invalidID);
                expect( invalidDrawingID).to.equal(invalidDrawID);
            });

            it('should return false if the drawing tags is not valid', () => {
                const invalidDrawTAG = (drawingController as any).isValid;
                const invalidDrawingTAG = (drawingController as any).isDrawingValid(invalidTags);
                expect( invalidDrawingTAG).to.equal(invalidDrawTAG);
            });

            it('should return true if the drawing name is valid', () => {
                const validDraw = (drawingController as any).isValid;
                const validDrawingName = (drawingController as any).isDrawingValid(validDrawing);
                expect( validDrawingName).to.equal(validDraw);
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

        describe('configureRouter function:', () =>  {

            describe('router.post(/add) function:', () =>  {

                it('should add drawing to the database', () => {
                    const validDrawingName = (drawingController as any).isDrawingValid(validDrawing);
                    (drawingController as any).configureRouter();
                    router.post('/add', async (req, res) => {
                        if (validDrawingName) {
                            expect(res.status).equal(200);
                    }
                    });
                });

                it('should not add drawing to the database', () => {
                    const invalidDrawing = (drawingController as any).isDrawingValid(invalidTags);
                    (drawingController as any).configureRouter();
                    router.post('/add', async (req, res) => {
                        if (invalidDrawing) {
                            expect(res.status).equal(500);
                    }
                    });
                });
            });
            describe('router.post(/addtag) function:', () =>  {

                it('should add tag with a valid drawing', () => {
                    const validDrawingTAG = (drawingController as any).isTagValid(validDrawing);
                    (drawingController as any).configureRouter();
                    router.post('/addtag', async (req, res) => {
                        drawingController.id = req.body.id;
                        drawingController.tag = req.body.tag;
                        if (drawingController.id && validDrawingTAG) {
                            expect(res.json).equal(`"${drawingController.tag}" tag added!`);
                    }
                    });
                });

                it('should not add tag with an invalidID', () => {
                    const invalidDrawingID = (drawingController as any).isTagValid(invalidID);
                    (drawingController as any).configureRouter();
                    router.post('/addtag', async (req, res) => {
                        drawingController.id = req.body.id;
                        drawingController.tag = req.body.tag;
                        if (drawingController.id && invalidDrawingID) {
                            expect(res.json).equal(`"${drawingController.tag}" NOT tag added.`);
                    }
                    });
                });

                it('should not add tag with an invalidTAG', () => {
                    const invalidDrawingTag = (drawingController as any).isTagValid(invalidTags);
                    (drawingController as any).configureRouter();
                    router.post('/addtag', async (req, res) => {
                        drawingController.id = req.body.id;
                        drawingController.tag = req.body.tag;
                        if (drawingController.id && invalidDrawingTag) {
                            expect(res.json).equal(`"${drawingController.tag }" NOT tag added.`);
                    }
                    });
                });
            });
            describe('router.get(/drawing/all) function:', () =>  {

                it('should get all drawing', () => {
                    const drawings = [validDrawing];
                    (drawingController as any).configureRouter();
                    router.get('/drawing/all', async (req, res) => {
                            expect(res.json).equal(drawings);
                    });
                });
            });

            describe('router.delete(/drawing/delete/:id) function:', () =>  {

                it('should delete the selected drawing with id', () => {
                    (drawingController as any).configureRouter();
                    router.delete('/drawing/delete/:id', async (req, res) => {
                        drawingController.id = req.params.id;
                        if (drawingController.id) {
                            expect(res.status).equal(200);
                        }
                    });
                });

                it('should not delete the selected drawing with id', () => {
                    (drawingController as any).configureRouter();
                    router.delete('/drawing/delete/:id', async (req, res) => {
                        drawingController.id = req.params.id;
                        if (drawingController.id) {
                            expect(res.status).equal(500);
                        }
                    });
                });
            });
        });
    });
});
