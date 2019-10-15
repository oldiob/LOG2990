import {NextFunction, Request, Response, Router} from 'express';
import {inject, injectable} from 'inversify';
import {Message} from '../../../common/communication/message';
// import { DataBaseService } from '../services/database.service';
import {DateService} from '../services/date.service';
import Types from '../types';

@injectable()
export class DateController {

    router: Router;
    page: any;

    constructor(
        @inject(Types.DateService) private dateService: DateService) {
      //  @inject(Types.DataBaseService) private database: DataBaseService) {
        this.configureRouter();
    }

    private configureRouter() {
        this.router = Router();
        this.router.get('/',
            (req: Request, res: Response, next: NextFunction) => {
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
        this.router.post('/add', (req, res) => {
           console.log(req.body);
           res.status(200).json({'RESPONSE': 'Message received'});
       });
        this.router.post('/addM', (req, res) => {
            // POST EXAMPLE DO NOT REMOVE SERVERSIDE
            console.log(req.body);
            res.status(200).json({'RESPONSE': 'Message received'});
        });
        this.router.post('/addTEST', (req, res) => {
            console.log(req.body);
            this.page = req.body;
            res.status(200).json({'RESPONSE': 'Message received'});
        });
        this.router.get('/getTEST', (req, res) => {
            console.log(this.page);
            console.log('Sending page');
            res.json(this.page);
        });
    }
}
