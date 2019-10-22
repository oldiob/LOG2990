import { DrawAreaHolder } from './draw-area-holder';

export class Drawing {
    id: number;

    name: string;
    tags: string[];
    holder: DrawAreaHolder;

    backgroundColor: string;
    width: number;
    height: number;
}
