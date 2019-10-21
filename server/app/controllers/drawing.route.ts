import {Request, Response, Router} from 'express';
import {inject, injectable} from 'inversify';
import { Drawing } from '../../../client/src/services/draw-area/i-drawing';
import {Message} from '../../../common/communication/message';
// import { DataBaseService } from '../services/database.service';
import {DateService} from '../services/date.service';
import Types from '../types';

@injectable()
export class DrawingRoute {

    router: Router;
    drawings: Drawing[];
    uniqueID: number;

    constructor(
        @inject(Types.DateService) private dateService: DateService) {
      //  @inject(Types.DataBaseService) private database: DataBaseService) {
        this.drawings = [];
        this.uniqueID = 0;
        this.configureRouter();
    }

    private assignID(drawing: Drawing): number {
            if ( drawing.id === -1) {
                const currentID = this.uniqueID;
                this.uniqueID++;
                drawing.id = currentID;
                return currentID;
            }
            return -1;
    }

    private isDrawingValid(drawing: Drawing): boolean {
            if (drawing.name === '') {
                    return false;
            }
            for (const tag of drawing.tags) {
                    if (!(/^[a-zA-Z]+$/.test(tag))) {
                        return false;
                    }
            }
            return true;
    }

    private findDrawing(id: number): Drawing | null {
        console.log('logging 2');
        for (let i = 0; i < this.drawings.length; i++) {
                console.log(this.drawings[i].id);
                if (this.drawings[i].id === id) {
                        return this.drawings[i];
                }
        }
        return null;
    }

    private getDrawingIndex(id: number): number {
        for (let i = 0; i < this.drawings.length; i++) {
                if (this.drawings[i].id === id) {
                        return i;
                }
        }
        return -1;
    }

    private findDrawingsByTag(tags: string[]): Drawing[] {
            let correctDrawings: Drawing[] = [];
            for (let i = 0; i < this.drawings.length; i++) {
                        if (this.drawings[i].tags.every((elem) => tags.indexOf(elem) > -1)) {
                                correctDrawings.push(this.drawings[i]);
                        }
                 }
            return correctDrawings;
    }

    private returnElementByRange(drawings: Drawing[], min: number, max: number): Drawing[] {
                let result: Drawing[] = [];
                for (let i = min; min < max; i++) {
                        result.push(drawings[i]);
                }
                return result;
    }

    private configureRouter() {
        this.router = Router();
        this.router.get('/',
            (req: Request, res: Response) => {
                // Send the request to the service and send the response
                this.dateService.currentTime().then((time: Message) => {
                    res.json(time);
                }).catch((reason: unknown) => {
                    const errorMessage: Message = {
                        title: `Error`,
                        body: reason as string,
                    };
                    res.json(errorMessage);
                });
            });
        this.router.get('/a', (req, res) => {
                // GET EXAMPLE DO NOT REMOVE SERVERSIDE
                const drawResponse = new Message();
                drawResponse.title = 'hello';
                drawResponse.body = 'world';
                res.json(drawResponse);
            });
            /*
        this.router.post('/add', (req, res) => {
                const drawing = new DrawingRoute(req.body.etiquette, req.body.SVGObjects, req.body.name);
                drawing.save()
                    .then(drawing => {
                    res.status(200).json({'Product': 'Product has been added successfully'});
                    })
                    .catch(err => {
                    res.status(400).send('unable to save to database');
                    });
        });
        */
        this.router.post('/addM', (req, res) => {
           console.log(req.body);
           res.status(200).json({RESPONSE: 'Message received'});
       });
        this.router.post('/add', (req, res) => {
                console.log(req.body);
                let drawing = new Drawing();
                drawing = req.body;
                if (this.isDrawingValid(drawing)) {
                        this.assignID(drawing);
                        this.drawings.push(drawing);
                        res.status(200).json({RESPONSE: 'drawing add to server'});
                } else {
                        res.status(500).json({RESPONSE: 'invalid drawing'});
                }
        });
        this.router.get('/drawing/count', (req, res) => {
                res.json(this.drawings.length);
        });
        this.router.get('/drawing/all', (req, res) => {
                res.json(this.drawings);
        });
        this.router.get('/drawing/byid/:id', (req, res) => {
                const id: number = Number(req.params.id);
                console.log('loggin');
                console.log('drawing[] size', this.drawings.length);
                console.log(this.findDrawing(id));
                res.json(this.findDrawing(id));
        });
        this.router.get('/drawing/bytags', (req, res) => {
                const tags: string[] = req.body.tags;
                const min: number = req.body.min;
                const max: number = req.body.min;

                const drawings: Drawing[] = this.findDrawingsByTag(tags);

                const result: Drawing[] = this.returnElementByRange(drawings, min, max);
                res.json(result);
        });
        this.router.delete('/drawing/delete/:id', (req: Request, res: Response) => {
                console.log('deleting');
                const index: number = this.getDrawingIndex(Number(req.params.id));
                if (index > -1) {
                        this.drawings.splice(index, 1);
                        res.status(200).json({RESPONSE: 'deleted'});
                } else {
                        res.status(500).json({RESPONSE: 'not found'});
                }
                console.log('Deleted');
        });
    }
}
