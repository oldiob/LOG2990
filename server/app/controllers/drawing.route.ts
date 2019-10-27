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

     assignID(drawing: Drawing): number {
            if ( drawing.id === -1) {
                const currentID = this.uniqueID;
                this.uniqueID++;
                drawing.id = currentID;
                return currentID;
            }
            return -1;
    }

     isDrawingValid(drawing: Drawing): boolean {
            let isDrawingValid = true;
            if (drawing.name === '') {
                isDrawingValid = false;
            }
            for (const tag of drawing.tags) {
                    if (!this.isTagValid(tag)) {
                        isDrawingValid = false;
                    }
            }
            return isDrawingValid;
    }

    isTagValid(tag: string): boolean {
        if (!(/^[a-zA-Z]+$/.test(tag))) {
                return false;
            }
        return true;
    }

     findDrawing(id: number): Drawing | null {
        for (let i = 0; i < this.drawings.length; i++) {
                if (this.drawings[i].id === id) {
                        return this.drawings[i];
                }
        }
        return null;
    }

     getDrawingIndex(id: number): number {
        for (let i = 0; i < this.drawings.length; i++) {
                if (this.drawings[i].id === id) {
                        return i;
                }
        }
        return -1;
    }

     findDrawingsByTag(tags: string[]): Drawing[] {
            const correctDrawings: Drawing[] = [];
            for (let i = 0; i < this.drawings.length; i++) {
                        if (this.drawings[i].tags.every((elem) => tags.indexOf(elem) > -1)) {
                                correctDrawings.push(this.drawings[i]);
                        }
                 }
            return correctDrawings;
    }

     returnElementByRange(drawings: Drawing[], min: number, max: number): Drawing[] {
                const result: Drawing[] = [];
                for (let i = min; min < max; i++) {
                        result.push(drawings[i]);
                }
                return result;
    }
    addTag(id: number, tag: string): boolean {
                const result = this.findDrawing(id);
                if (result === null || !this.isTagValid(tag)) {
                        return false;
                } else {
                        result.tags.push(tag);
                        return true;
                }
    }

     configureRouter() {
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

        this.router.post('/addM', (req, res) => {
           res.status(200).json({RESPONSE: 'Message received'});
       });
        this.router.post('/add', (req, res) => {
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
        this.router.post('/addtag', (req, res) => {
                const id: number = req.body.id;
                const tag: string = req.body.tag;
                if (this.addTag(id, tag)) {
                        res.json('tag added');
                } else {
                        res.json('tag not added');
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
                const index: number = this.getDrawingIndex(Number(req.params.id));
                if (index > -1) {
                        this.drawings.splice(index, 1);
                        res.status(200).json({RESPONSE: 'deleted'});
                } else {
                        res.status(500).json({RESPONSE: 'not found'});
                }
        });
    }
}
