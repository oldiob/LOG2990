import { injectable } from 'inversify';
import { Collection, Db, MongoClient, MongoError } from 'mongodb';
import { Drawing } from '../../../client/src/services/draw-area/i-drawing';

const DB_URL = 'mongodb+srv://dapak:rebase8@rebase-67b9x.mongodb.net/test';

@injectable()
export class DataBaseService {

    private mongo: MongoClient;
    private db: Db;

    // connect database with MongoDB Compass Community
    async connectDB(): Promise<MongoClient> {
        if (this.mongo !== undefined) { return this.mongo; }
        this.mongo = await MongoClient.connect(DB_URL, {useNewUrlParser: true,
                                                        useUnifiedTopology: true});
        return this.mongo;
    }

    async addDrawing(draw: Drawing): Promise<void> {
        this.db = (await this.connectDB()).db('Rebase08');
        const drawings: Collection<Drawing> = this.db.collection('Drawing');
        const drawing: Drawing = draw;
        drawings.insertOne(drawing);
    }

    async deleteDrawing(draw: Drawing): Promise<void> {
        this.db = (await this.connectDB()).db('Rebase08');
        const drawings: Collection<Drawing> = this.db.collection('Drawing');
        const drawing: Drawing = draw;
        drawings.deleteOne(drawing);
    }

    async getAllDrawings(): Promise<Drawing[]> {
        this.db = (await this.connectDB()).db('Rebase08');

        return new Promise<Drawing[]>((
            resolve: (value?: Drawing[] | PromiseLike<Drawing[]> | undefined) => void,
            // tslint:disable-next-line:no-any
            reject: (reason?: any) => void) => {

            this.db.collection('Drawing').find().toArray((err: MongoError, result: Drawing[]) => {
                err
                 ? reject(err)
                 : resolve(result);
            });
        });

    }

    async updateTags(draw: Drawing): Promise<void> {
        this.db = (await this.connectDB()).db('Rebase08');
        const drawings: Collection<Drawing> = this.db.collection('Drawing');
        const drawing: Drawing = draw;
        drawings.findOneAndUpdate({id: drawing.id}, {$set: {tags: drawing.tags}},
                                  {upsert: true});
    }

}
