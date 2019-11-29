import { BreadthFirst } from './breadth-first';
import { createArray } from './image-manipulations';

fdescribe('BreadFirst', () => {

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
        width = Math.floor(Math.random() * 1000);
        height = Math.floor(Math.random() * 1000);
        tolerance = Math.floor(Math.random() * 1000);
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
        const temp = (breadthFirst as any).isPixelCovered[tempPosition[0]][tempPosition[1]]
        expect((breadthFirst as any).isPositionCovered(tempPosition)).toEqual(temp);
    });

    it('should return true when isPositionInRange is called when position is smaller then height and width', () => {
        const tempPosition: number[] = [1, 1];
        expect((breadthFirst as any).isPositionInRange(tempPosition)).toEqual(true);
    });

    it('should return false when isPositionInRange is called when position is bigger then height and width', () => {
        const tempPosition: number[] = [10000, 10000];
        expect((breadthFirst as any).isPositionInRange(tempPosition)).toEqual(false);
    });
});
