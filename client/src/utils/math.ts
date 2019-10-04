
export const atLine = (point: number[], line: number[][], width: number): boolean => {
    validateLength(point, 2);
    validateLength(line, 2);

    validateLength(line[0], 2);
    validateLength(line[1], 2);

    const halfWidth = width / 2.0;

    const directionVector = vMinus(line[1], line[0]);
    const toPoint = vMinus(point, line[0]);

    const parallel = vProject(toPoint, directionVector);
    const perpendicular = vMinus(toPoint, parallel);

    const perpendicularModule = vModule(perpendicular);
    if (halfWidth < perpendicularModule) {
        return false;
    }

    // direction size + size of 2 widthss
    const directionModule = vModule(directionVector);
    const behindLength = halfWidth;
    const forwardLength = directionModule + halfWidth;

    const parallelModule = vModule(parallel);

    // if parallel pointing behind direction vector
    if (vDot(directionVector, parallel) < 0) {
        return parallelModule <= behindLength;
    }

    return parallelModule <= forwardLength;
};

export const vProject = (vector: number[], onto: number[]): number[] => {
    validateLength(vector, 2);
    validateLength(onto, 2);

    const moduleSquare: number = onto[0] * onto[0] + onto[1] * onto[1];

    const ratio = vDot(vector, onto) / moduleSquare;

    return [ratio * onto[0], ratio * onto[1]];
};

export const vMinus = (v0: number[], v1: number[]): number[] => {
    validateLength(v0, 2);
    validateLength(v1, 2);

    return [v0[0] - v1[0], v0[1] - v1[1]];
};

export const vModule = (vector: number[]): number => {
    validateLength(vector, 2);
    return Math.sqrt(vector[0] * vector[0] + vector[1] * vector[1]);
};

export const vDot = (v0: number[], v1: number[]): number => {
    validateLength(v0, 2);
    validateLength(v1, 2);

    return v0[0] * v1[0] + v0[1] * v1[1];
};

const validateLength = (list: any[], expectedLength: number): void => {
    if (list.length !== expectedLength) {
        throw new Error('List length not valid. Expected ' + expectedLength + ', got ' + list.length);
    }
};
