import { expect } from 'chai';
import { Drawing } from '../../../client/src/services/draw-area/i-drawing';
import { DataBaseService } from '../services/database.service';
import { DrawingController } from './drawing.controller';

describe('DrawingRoutes :', () => {
    let drawingController: DrawingController;
    let database: DataBaseService;
    let invalidID: Drawing;
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
    invalidID = {
        _id: '-1',
        name: 'test',
        tags: ['allo'],
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
        backgroundColor: '#ffffff',
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

    it('should create', () => {
        expect(drawingController.).true;
    });
});
