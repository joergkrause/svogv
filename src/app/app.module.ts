import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
// third party
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
// routes' configuration
import { routes } from './configurations/routes';

import { DemoBootstrapModule } from './modules/demo-bootstrap/demo-bootstrap.module';
import { DemoMaterialModule } from './modules/demo-material/demo-material.module';
import { RootComponent } from './components/root/root.component';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    DemoBootstrapModule, DemoMaterialModule,
    HighlightModule
  ],
  declarations: [
    // Demo app
    RootComponent,
    AboutComponent,
    HomeComponent
  ],
  bootstrap: [RootComponent],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        lineNumbersLoader: () => import('highlightjs-line-numbers.js'), // Optional, only if you want the line numbers
        languages: {
          typescript: () => import('highlight.js/lib/languages/typescript'),
          css: () => import('highlight.js/lib/languages/css'),
          xml: () => import('highlight.js/lib/languages/xml')
        }
      }
    }
  ]
})
export class AppModule {
}
