import { injectable } from 'inversify';
import { Collection, Db, MongoClient } from 'mongodb';
import { ITool } from '../../../client/src/services/tool/tool-options/i-tool';

const DB_URL = 'mongodb+srv://Admin:rebase8@rebase-67b9x.mongodb.net/admin';

@injectable()
export class DataBaseService {

    private mongo: MongoClient;
    private db: Db;

    // connect database with MongoDB Compass Community
    async connectDB(): Promise<MongoClient> {
        if (this.mongo !== undefined) { return this.mongo; }
        this.mongo = await MongoClient.connect(DB_URL, {useNewUrlParser: true});
        console.log('Connect');
        return this.mongo;
    }

    async addShape(shapeTool: ITool): Promise<void> {
        this.db = (await this.connectDB()).db('Rebase08');
        const shapes: Collection<ITool> = this.db.collection('Shape');
        const shape: ITool = shapeTool;
        shapes.insertOne(shape);
    }

    async deleteShape(shapeTool: ITool): Promise<void> {
        this.db = (await this.connectDB()).db('Rebase08');
        const shapes: Collection<ITool> = this.db.collection('Shape');
        const shape = shapeTool;
        shapes.deleteOne(shape);

    }
    // update shape
    /*async updateShape(shapeTool: ITool): Promise<void> {
        this.db = (await this.connectDB()).db('Rebase08');
        const shapes: Collection<ITool> = this.db.collection('Shape');
        const shape: ITool = shapeTool;
        // set what you want to update $set color, epaisseur, etc.
        shapes.findOneAndUpdate({id: shape.ID}, {$set: {}},
                               {upsert: true});
    }*/

}
