import { DrawAreaHolder } from 'src/utils/element-parser';

export class Drawing {
    id: number;

    name: string;
    tags: string[];
    holder: DrawAreaHolder;

    backgroundColor: string;
    width: number;
    height: number;
}
