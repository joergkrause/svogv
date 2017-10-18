import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';

import { RootModule } from './app.module';

// uncomment to use in production
enableProdMode();
platformBrowserDynamic().bootstrapModule(RootModule);
