
const atLine = (point: number[], line: number[][], width: number): boolean => {
    const halfWidthSquared = (width / 2.0) * (width / 2.0);

    const directionVector = minus(line[1], line[0]);
    const toPoint = minus(point, line[0]);

    const parallel = project(toPoint, directionVector);
    const perpendicular = minus(toPoint, parallel);

    if (halfWidthSquared > moduleSquared(perpendicular)) {
        return false;
    }

    const ratio = parallel[0] / directionVector[0];
    return ratio <= 1 && ratio >= 0;
};

const project = (vector: number[], onto: number[]): number[] => {
    const dot: number = vector[0] * onto[0] + vector[1] * vector[1];
    const moduleSquare: number = onto[0] * onto[0] + onto[1] * onto[1];

    const ratio = dot / moduleSquare;

    return [ratio * onto[0], ratio * onto[1]];
};

const minus = (v0: number[], v1: number[]): number[] => {
    return [v0[0] - v1[0], v0[1] - v1[1]];
};

const moduleSquared = (vector: number[]): number => {
    return vector[0] * vector[0] + vector[1] * vector[1];
}