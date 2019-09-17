import { ITool } from './tool-options/i-tool';

export class ToolCategory {

    private toolIndex: number;
    private tools: ITool[];

    constructor(tools: ITool[]) {
        if (tools.length === 0) {
            throw new Error("Number of tools can't be 0 in a ToolCategory.");
        }

        this.tools = tools;
        this.toolIndex = 0;
    }

    getToolIndex(): number {
        return this.toolIndex;
    }

    getCurrentTool(): ITool {
        return this.tools[this.toolIndex];
    }

    selectTool(toolIndex: number): void {
        this.toolIndex = toolIndex;
    }

}
