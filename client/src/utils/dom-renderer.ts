import { Renderer2, RendererFactory2 } from '@angular/core';

export class DOMRenderer {
    static renderer: Renderer2;

    static init(rendererFactory: RendererFactory2) {
        if (this.renderer === undefined) {
            DOMRenderer.renderer = rendererFactory.createRenderer(null, null);
        }
    }

    static createElement(name: string, namespace?: string | undefined): any {
        return DOMRenderer.renderer.createElement(name, namespace);
    }

    static setAttribute(el: any, name: string, value: string, namespace?: string | null | undefined): void {
        return DOMRenderer.renderer.setAttribute(el, name, value, namespace);
    }

    static appendChild(parent: any, newChild: any): void {
        return DOMRenderer.renderer.appendChild(parent, newChild);
    }

    static removeChild(parent: any, oldChild: any, isHostElement?: boolean | undefined): void {
        return DOMRenderer.renderer.removeChild(parent, oldChild, isHostElement);
    }
}
