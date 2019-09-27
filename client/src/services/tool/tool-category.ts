import { ITool } from './tool-options/i-tool';

export class ToolCategory {

    private toolIndex: number;
    private tools: ITool[];

    currentTool: ITool;

    constructor(tools: ITool[]) {
        if (tools.length === 0) {
            throw new Error('Number of tools can not be 0 in a ToolCategory.');
        }

        this.tools = tools;
        this.toolIndex = 0;
    }

    getFilename(toolIndex: number): string {
        const currentIndex: number = this.toolIndex;
        this.selectTool(toolIndex);
        const filename: string = this.getCurrentTool().FILENAME;
        this.selectTool(currentIndex);

        return filename;
    }

    getCurrentFilename(): string {
        return this.tools[this.toolIndex].FILENAME;
    }

    getToolIndex(): number {
        return this.toolIndex;
    }

    getCurrentTool(): ITool {
        return this.tools[this.toolIndex];
    }

    selectTool(toolIndex: number): void {
        if (!Number.isInteger(toolIndex)) {
            throw new Error('Tool index is not an Integer.');
        }
        if (toolIndex >= this.tools.length) {
            throw new Error('Tool index is greater that the number of tools.');
        }
        if (toolIndex < 0) {
            throw new Error('Tool index is negative.');
        }

        this.toolIndex = toolIndex;
        this.currentTool = this.tools[this.toolIndex];
    }

}
