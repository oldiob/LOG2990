import { Color } from '../../utils/color';
import { DrawAreaHolder } from './draw-area-holder';

export class Drawing {
    // tslint:disable-next-line:variable-name
    _id: string | null;

    name: string;
    tags: string[];
    holder: DrawAreaHolder;

    backgroundColor: Color;
    width: number;
    height: number;
}
