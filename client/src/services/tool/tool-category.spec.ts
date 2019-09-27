import { ToolCategory } from './tool-category';
import { ITool } from './tool-options/i-tool';

describe('Class: ToolCategory', () => {

    class TestTool implements ITool {
        FILENAME: string = "test.png";

        onPressed(event: MouseEvent): import('../svg/element/svg.interface').SVGInterface | null {
            throw new Error('Method not implemented.');
        }
        onMotion(event: MouseEvent): void {
            throw new Error('Method not implemented.');
        }
        onReleased(event: MouseEvent): void {
            throw new Error('Method not implemented.');
        }
        leftClick(): void {
            //
        }
        leftRelease(): void {
            //
        }
    }

    it('Should not create a ToolCategory object without tools.', () => {
        // tslint:disable-next-line:no-unused-expression
        expect(() => { new ToolCategory([]); }).toThrowError('Number of tools can not be 0 in a ToolCategory.');
    });

    it('Should create a ToolCategory object.', () => {
        const toolCategory: ToolCategory = new ToolCategory([new TestTool(), new TestTool()]);
        expect(toolCategory).toBeDefined();
    });

    it('Should select a correct tool.', () => {
        const tool0: ITool = new TestTool();
        const tool1: ITool = new TestTool();
        const toolCategory: ToolCategory = new ToolCategory([tool0, tool1]);

        expect(toolCategory.getToolIndex()).toBe(0);
        expect(toolCategory.getCurrentTool()).toBe(tool0);

        toolCategory.selectTool(1);

        expect(toolCategory.getToolIndex()).toBe(1);
        expect(toolCategory.getCurrentTool()).toBe(tool1);
    });

    it('Should not let select invalid tools.', () => {
        const toolCategory: ToolCategory = new ToolCategory([new TestTool(), new TestTool()]);

        expect(() => { toolCategory.selectTool(0.23); }).toThrowError('Tool index is not an Integer.');
        expect(() => { toolCategory.selectTool(2); }).toThrowError('Tool index is greater that the number of tools.');
        expect(() => { toolCategory.selectTool(-1); }).toThrowError('Tool index is negative.');
    });
});
