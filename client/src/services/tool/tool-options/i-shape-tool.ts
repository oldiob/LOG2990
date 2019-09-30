import { ITool } from './i-tool';

export enum TraceType {
    BorderOnly = 0,
    FillOnly = 1,
    FillAndBorder = 2,
}

export interface IShapeTool extends ITool {
    width: number;
    traceType: TraceType;
}
