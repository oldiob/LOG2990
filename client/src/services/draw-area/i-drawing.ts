import { DrawAreaHolder } from './draw-area-holder';

export class Drawing {
    // tslint:disable-next-line:variable-name
    _id: string;

    name: string;
    tags: string[];
    holder: DrawAreaHolder;

    backgroundColor: string;
    width: number;
    height: number;
}
