import {Container} from 'inversify';
import 'reflect-metadata';
import {Application} from './app';
import {DrawingController} from './controllers/drawing.controller';
import {Server} from './server';
import {DatabaseService} from './services/database.service';
import Types from './types';
const container: Container = new Container();

container.bind(Types.Server).to(Server);
container.bind(Types.Application).to(Application);
container.bind(Types.DrawingController).to(DrawingController);
container.bind(Types.DatabaseService).to(DatabaseService);

export {container};
