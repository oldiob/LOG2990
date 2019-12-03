import { BreadthFirst } from './breadth-first';
import { createArray } from './image-manipulations';
import { Queue } from './queue';

describe('BreadthFirst', () => {

    let breadthFirst: BreadthFirst;
    let position: number[];
    let image: ImageData;
    let tolerance: number;
    let x: number;
    let y: number;
    let width: number;
    let height: number;
    beforeEach(() => {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
        width = 1000;
        height = 1000;
        tolerance = 100;
        const array: number[] = createArray(width, height);
        const uint8Array = Uint8ClampedArray.from(array);
        position = [x, y];
        image = new ImageData(uint8Array, width, height);
        breadthFirst = new BreadthFirst(position, image, tolerance);
    });

    it('should exist', () => {
        expect(breadthFirst).toBeTruthy();
    });

    it('should fill up isPixelCoveredArray when initEmptyCovered is called', () => {
        const tempPosition: number[] = [1, 1];
        const temp = (breadthFirst as any).isPixelCovered[tempPosition[0]][tempPosition[1]];
        expect((breadthFirst as any).isPositionCovered(tempPosition)).toEqual(temp);
    });

    it('should return true when isPositionCovered is called when the given position is covered', () => {
        (breadthFirst as any).isPixelCovered[1][0] = true;
        (breadthFirst as any).isPixelCovered[1][1] = true;
        const tempPosition: number[] = [1, 1];
        expect((breadthFirst as any).isPositionInRange(tempPosition)).toEqual(true);
    });

    it('should return true when isPositionInRange is called when position is smaller then height and width', () => {
        const tempPosition: number[] = [1, 1];
        expect((breadthFirst as any).isPositionInRange(tempPosition)).toEqual(true);
    });

    it('should return false when isPositionInRange is called when position is bigger then height and width', () => {
        const tempPosition: number[] = [10000, 10000];
        expect((breadthFirst as any).isPositionInRange(tempPosition)).toEqual(false);
    });

    it('isPositionAcceptable should return false when isPositionInRange, and isRightColor are true but isPositionCovered is false', () => {
        const tempPosition: number[] = [1, 1];
        expect((breadthFirst as any).isPositionAcceptable(tempPosition)).toEqual(false);
    });

    it('populatePixel is called', () => {
        const tempPosition: number[] = [x, y];
        const toFillQueue: Queue<number[]> = new Queue<number[]>();

        spyOn((breadthFirst as any), 'isPositionAcceptable').and.returnValue(true);
        spyOn(breadthFirst.positions, 'push');
        spyOn(toFillQueue, 'push');
        (breadthFirst as any).populatePixel(toFillQueue, tempPosition);
        expect(breadthFirst.positions.push).toHaveBeenCalled();
        expect(toFillQueue.push).toHaveBeenCalled();

    });

});
