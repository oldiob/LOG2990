import { KeyService } from 'src/services/key/key.service';
import { DOMRenderer } from 'src/utils/dom-renderer';
import { SVGText } from './svg.text';

describe('SVGText', () => {
    let svgText: SVGText;
    let currentSubElement: any;
    let keyService: KeyService;
    let renderer: any;
    let subElements: any;
    const textAlign = 'start';
    const fontFamily = 'Arial';
    const fontStyle = 'italic';
    const fontSize = '15px';
    const fontWeight = 'bold';

    beforeEach(() => {
        renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute', 'appendChild', 'removeChild']);
        DOMRenderer.renderer = renderer;
        currentSubElement = jasmine.createSpyObj('any', ['innerHTML']);
        keyService = new KeyService();
        spyOn(renderer, 'createElement').and.returnValue(currentSubElement);
        svgText = new SVGText(keyService, 0, 0, fontFamily, fontSize, textAlign, fontStyle, fontWeight);
        subElements = [];
        svgText.subElements = subElements;
    });

    it('should create', () => {
        expect(svgText).toBeTruthy();
    });

    it('should set primary color properly', () => {
        spyOn(svgText, 'setPrimary');
        svgText.setPrimary('ffffff');
        expect(renderer.setAttribute).toHaveBeenCalled();
    });

    it('should set font size properly', () => {
        svgText.setFontSize(fontSize);
        expect(svgText.fontSize).toEqual(fontSize);
        expect(renderer.setAttribute).toHaveBeenCalled();
    });

    it('should set font family properly', () => {
        svgText.setFontFamily(fontFamily);
        expect(svgText.fontFamily).toEqual(fontFamily);
        expect(renderer.setAttribute).toHaveBeenCalled();
    });

    it('should set font style properly', () => {
        svgText.setFontStyle(fontStyle);
        expect(svgText.fontStyle).toEqual(fontStyle);
        expect(renderer.setAttribute).toHaveBeenCalled();
    });

    it('should set font weight properly', () => {
        svgText.setFontWeight(fontWeight);
        expect(svgText.fontWeight).toEqual(fontWeight);
        expect(renderer.setAttribute).toHaveBeenCalled();
    });

    it('should set text align properly', () => {
        svgText.setTextAlign(textAlign);
        expect(svgText.textAlign).toEqual(textAlign);
        expect(renderer.setAttribute).toHaveBeenCalled();
    });

    it('should create a placeholder properly', () => {
        svgText.setCurrentPlaceholder();
        expect(svgText.currentSubElement.innerHTML).toBe(svgText.INVISIBLE_LINE_VALUE);
    });

    it('should create line break properly', () => {
        svgText.setLineBreak();
        expect(renderer.setAttribute).toHaveBeenCalledTimes(15);
        expect(renderer.appendChild).toHaveBeenCalled();
    });

    it('should remove character if the character is i', () => {
        spyOn(svgText, 'removeLine');
        svgText.currentSubElement.innerHTML = svgText.INVISIBLE_LINE_VALUE;
        svgText.removeCharacter();
        expect(svgText.removeLine).toHaveBeenCalled();
    });

    it('should remove character if the character is empty', () => {
        spyOn(svgText, 'removeLine');
        svgText.currentSubElement.innerHTML = svgText.UNSET;
        svgText.removeCharacter();
        expect(svgText.removeLine).toHaveBeenCalled();
    });

    it('should remove character if the character is not empty', () => {
        svgText.currentSubElement.innerHTML = svgText.SPOT_TEXT;
        svgText.content = svgText.currentSubElement.innerHTML;
        svgText.content = svgText.content.substring(0, svgText.content.length - 1);
        svgText.removeCharacter();
        expect(svgText.currentSubElement.innerHTML).toEqual('Enter text..');
    });

    it('should remove line', () => {
        svgText.subElements = [svgText.SPOT_TEXT, svgText.BOLD];
        spyOn(svgText.subElements, 'pop');
        svgText.removeLine();
        expect(svgText.subElements.pop).toHaveBeenCalled();
        expect(renderer.removeChild).toHaveBeenCalled();
    });

    it('should reset offsetX to 0', () => {
        svgText.resetX();
        expect(svgText.offsetX).toBe(0);
    });

    it('should set offsetX to the given value', () => {
        svgText.setX(50);
        expect(svgText.offsetX).toBe(50);
    });

    it('should compute offset properly for start case', () => {
        svgText.offsetX = 0;
        svgText.computeOffset('start');
        expect(svgText.offsetX).toBe(0);
    });
});
