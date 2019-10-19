import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';
import { environment } from './environments/environment';

if (environment.production) {
  //
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch((err) => console.error(err));
