import { Injector } from '@angular/core';

export class MyInjector {
    static injector: Injector;

    static init(injector: Injector) {
        MyInjector.injector = injector;
    }

    static get(token: any): any {
        return MyInjector.injector.get(token);
    }
}
