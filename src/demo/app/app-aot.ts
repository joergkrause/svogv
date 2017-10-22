import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModuleNgFactory } from '../../aot/app/app.module.ngfactory';
import { enableProdMode } from '@angular/core';

// uncomment to use in production
enableProdMode();
platformBrowserDynamic().bootstrapModule(AppModuleNgFactory);
