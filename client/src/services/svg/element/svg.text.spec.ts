import { KeyService } from 'src/services/key/key.service';
import { DOMRenderer } from 'src/utils/dom-renderer';
import { SVGText } from './svg.text';

fdescribe('SVGText', () => {
    jasmine.getEnv().allowRespy(true);
    let svgText: SVGText;
    let currentSubElement: any;
    let keyService: KeyService;
    let renderer: any;
    let event: MouseEvent;
    const textAlign = 'start';
    const fontFamily = 'Arial';
    const fontStyle = 'italic';
    const fontSize = '15px';
    const fontWeight = 'bold';

    beforeEach(() => {
        renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute', 'appendChild']);
        DOMRenderer.renderer = renderer;
        currentSubElement = jasmine.createSpyObj('any', ['innerHTML']);
        event = new MouseEvent('click');
        keyService = new KeyService();
        svgText = new SVGText(keyService, event.svgX, event.svgY, fontFamily, fontSize, textAlign, fontStyle, fontWeight);
        svgText.currentSubElement = currentSubElement;
    });

    it('should create', () => {
        expect(svgText).toBeTruthy();
    });

    // it('should set primary color properly', () => {
    //   spyOn(svgText, 'setPrimary');
    //   svgText.setPrimary('000000');
    //   expect(renderer.setAttribute).toHaveBeenCalled();
    // });
    // it('should set font size properly', () => {
    //   expect(renderer.setAttribute).toHaveBeenCalled();
    // });
    // it('should set font family properly', () => {
    //   expect(renderer.setAttribute).toHaveBeenCalled();
    // });
    // it('should set font style properly', () => {
    //   expect(renderer.setAttribute).toHaveBeenCalled();
    // });
    // it('should set font weight properly', () => {
    //   expect(renderer.setAttribute).toHaveBeenCalled();
    // });
    // it('should set text align properly', () => {
    //   expect(renderer.setAttribute).toHaveBeenCalledTimes(svgText.subElements.length);
    // });
    // it('should create a placeholder properly', () => {
    //     svgText.setCurrentPlaceholder();
    //     expect(svgText.currentSubElement.innerHTML).toBe('i');
    // });
    // it('should create line break properly', () => {
    //     svgText.setLineBreak();
    //     expect(renderer.setAttribute).toHaveBeenCalledTimes(3);
    //     expect(renderer.appendChild).toHaveBeenCalled();
    // });

});
