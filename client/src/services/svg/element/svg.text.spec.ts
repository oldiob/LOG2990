// import { async, TestBed } from '@angular/core/testing';
// import { KeyService } from 'src/services/key/key.service';
// import { DOMRenderer } from 'src/utils/dom-renderer';
// import { SVGText } from './svg.text';

// describe('SVGText', () => {
//     let svgText: SVGText;
//     let keyService: KeyService;
//     let renderer: any;
//     const fontFamily = 'Arial';
//     const fontSize = '15px';
//     const fontWeight = 'bold';
//     const fontStyle = 'italic';
//     const textAlign = 'center';

//     beforeEach(async(() => {
//         TestBed.configureTestingModule({
//             providers: [
//                 { provide: KeyService, useValue: keyService },
//             ],
//         })
//             .compileComponents();
//     }));

//     beforeEach(() => {
//         renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute', 'appendChild']);
//         DOMRenderer.renderer = renderer;
//         keyService = jasmine.createSpyObj('KeyService', ['disableShortcut']);
//         svgText = new SVGText(keyService, 0, 0, fontFamily, fontSize, textAlign, fontStyle, fontWeight);
//     });

//     it('should create', () => {
//         expect(svgText).toBeTruthy();
//     });

//     it('should set primary color properly', () => {
//       spyOn(svgText, 'setPrimary');
//       svgText.setPrimary('000000');
//       expect(renderer.setAttribute).toHaveBeenCalled();
//     });
//     it('should set font size properly', () => {
//       expect(renderer.setAttribute).toHaveBeenCalled();
//     });
//     it('should set font family properly', () => {
//       expect(renderer.setAttribute).toHaveBeenCalled();
//     });
//     it('should set font style properly', () => {
//       expect(renderer.setAttribute).toHaveBeenCalled();
//     });
//     it('should set font weight properly', () => {
//       expect(renderer.setAttribute).toHaveBeenCalled();
//     });
//     it('should set text align properly', () => {
//       expect(renderer.setAttribute).toHaveBeenCalledTimes(svgText.subElements.length);
//     });
//     it('should create a placeholder properly', () => {
//         svgText.setCurrentPlaceholder();
//         expect(svgText.currentSubElement.innerHTML).toBe('i');
//     });
//     it('should create line break properly', () => {
//         svgText.setLineBreak();
//         expect(renderer.setAttribute).toHaveBeenCalledTimes(3);
//         expect(renderer.appendChild).toHaveBeenCalled();
//     });

// });
