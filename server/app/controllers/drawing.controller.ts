import { Request, Response, Router } from 'express';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { Drawing } from '../../../client/src/services/draw-area/i-drawing';
import { DataBaseService } from '../services/database.service';
import Types from '../types';
@injectable()
export class DrawingController {

    router: Router;
    drawings: Drawing[];
    uniqueID: number;

    constructor(@inject(Types.DataBaseService) private database: DataBaseService) {
        this.drawings = [];
        this.uniqueID = 0;
        this.configureRouter();
    }

    private isDrawingValid(drawing: Drawing): boolean {
        let isValid = drawing.name !== '';
        for (const tag of drawing.tags) {
            if (!this.isTagValid(tag)) {
                isValid = false;
            }
        }
        return isValid;
    }

    private isTagValid(tag: string): boolean {
        return /^[a-zA-Z]+$/.test(tag);
    }

    configureRouter() {
        this.router = Router();

        this.router.post('/add', async (req, res) => {
            const drawing = req.body as Drawing;
            if (this.isDrawingValid(drawing)) {
                await this.database.addDrawing(drawing);
                res.status(200).json({ RESPONSE: 'Drawing added to database!' });
            } else {
                res.status(500).json({ RESPONSE: 'Invalid drawing.' });
            }
        });

        this.router.post('/addtag', async (req, res) => {
            const drawing: Drawing = req.body.drawing;
            const tag: string = req.body.tag;

            if (drawing && this.isTagValid(tag)) {
                await this.database.updateTags(drawing, tag);
                res.json('tag added');
            } else {
                res.json('tag not added');
            }
        });

        this.router.get('/drawing/all', async (req, res) => {
            let drawings: Drawing[] = [];
            await this.database.getAllDrawings()
                .then((onlineDrawings: Drawing[]) => drawings = onlineDrawings);
            res.json(drawings);
        });

        this.router.delete('/drawing/delete/:id', async (req: Request, res: Response) => {
            const id: number = JSON.parse(req.params.id);
            const INVALID_ID = -1;
            if (id === INVALID_ID) {
                res.status(500).json({ RESPONSE: 'Drawing not found.' });
            } else {
                await this.database.deleteDrawing(id);
                res.status(200).json({ RESPONSE: 'Drawing has been deleted!' });
            }
        });
    }
}
