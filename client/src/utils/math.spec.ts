import { atLine, vDot, vMinus, vModule, vProject } from './math';

describe('BucketTool', () => {

    const v0 = [23, 31];
    const v1 = [53, 92];

    const badV = [3, 13, 53];

    it('should subtract vectors', () => {
        expect(() => vMinus(v0, badV)).toThrowError('List length not valid. Expected 2, got 3');
        expect(vMinus(v0, v1)).toEqual([-30, -61]);
        expect(vMinus(v1, v0)).toEqual([30, 61]);
        expect(vMinus(v0, v0)).toEqual([0, 0]);
    });

    it('should calculate vector module', () => {
        expect(() => vModule(badV)).toThrowError('List length not valid. Expected 2, got 3');
        expect(vModule(v0)).toBeCloseTo(38.6);
        expect(vModule(v1)).toBeCloseTo(106.17);
    });

    it('should calculate the dot product', () => {
        expect(vDot(v1, v0)).toEqual(4071);
        expect(vDot(v0, v1)).toEqual(4071);
    });

    it('should project a vector onto another', () => {
        // ratio = dot/mod^2 = 0.36116
        let result = vProject(v0, v1);
        expect(result[0]).toBeCloseTo(19.1398);
        expect(result[1]).toBeCloseTo(33.2238);

        // ratio = dot/mod^2 = 2.732288
        result = vProject(v1, v0);
        expect(result[0]).toBeCloseTo(62.84);
        expect(result[1]).toBeCloseTo(84.7);
    });

    it('should check if point is at line', () => {
        expect(() => atLine(badV, [v0, v1], 1)).toThrowError('List length not valid. Expected 2, got 3');
        expect(() => atLine(v0, [v0, v1, v1], 1)).toThrowError('List length not valid. Expected 2, got 3');
        expect(() => atLine(v0, [v0, badV], 1)).toThrowError('List length not valid. Expected 2, got 3');

        expect(atLine(v0, [v0, v1], 1)).toBe(true);
        expect(atLine(v1, [v0, v1], 1)).toBe(true);
        expect(atLine(v0, [v1, v0], 1)).toBe(true);

        expect(atLine([0, 0], [v1, v0], 1)).toBe(false);
    });
});
