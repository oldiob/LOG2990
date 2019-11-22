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
    isValid: boolean;
    id: string;
    tag: string;

    constructor(@inject(Types.DataBaseService) private database: DataBaseService) {
        this.drawings = [];
        this.configureRouter();
    }

    private isDrawingValid(drawing: Drawing): boolean {
        this.isValid = drawing.name !== '' && !drawing._id;
        for (const tag of drawing.tags) {
            if (!this.isTagValid(tag)) {
                this.isValid = false;
            }
        }
        return  this.isValid;
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
                if (drawing._id !== null) {
                await this.database.updateTime(drawing._id.toString());
                }
                res.status(200).json({ RESPONSE: 'Drawing added to database!' });
            } else {
                res.status(500).json({ RESPONSE: 'Invalid drawing.' });
            }
        });

        this.router.post('/addtag', async (req, res) => {
            this.id = req.body.id;
            this.tag  = req.body.tag;

            if (this.id && this.isTagValid(this.tag)) {
                await this.database.updateTags(this.id, this.tag);
                await this.database.updateTime(this.id);
                res.json(`"${this.tag}" tag added!`);
            } else {
                res.json(`"${this.tag}" NOT tag added.`);
            }
        });

        this.router.get('/drawing/all', async (req, res) => {
            this.drawings = [];
            await this.database.getAllDrawings()
                .then((onlineDrawings: Drawing[]) => this.drawings = onlineDrawings);
            res.json(this.drawings);
        });

        this.router.delete('/drawing/delete/:id', async (req: Request, res: Response) => {
            this.id = req.params.id;
            if (this.id) {
                await this.database.deleteDrawing(this.id);
                res.status(200).json({ RESPONSE: 'Drawing has been deleted!' });
            } else {
                res.status(500).json({ RESPONSE: 'Drawing not found.' });
            }
        });
    }
}
