import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
// third party
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
// access to WebAPI (Demo Data)
import { SiteApiService, EmitterService } from './services';
// custom components
import * as cmp from './components';
// routes' configuration
import { routes } from './configurations/routes';

import { SvogvBootstrapModule } from '../../projects/bootstrap-ui/src/public-api';
import { PercentPipe } from './viewmodels/pipe/percent.pipe';
import { DropdownDirective } from './directives/dropdown.directive';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    SvogvBootstrapModule.forRoot(),
    HighlightModule
  ],
  declarations: [
    // Demo app
    cmp.RootComponent
    // Editor, Validation & Grid
    , cmp.EditorNewComponent
    , cmp.EditorAutoformComponent
    , cmp.EditorFormComponent
    , cmp.EditorListComponent
    , cmp.EditorDeleteComponent
    // Widget Demos
    , cmp.WidgetDemoComponent
    , cmp.GridDemoSimpleComponent
    , cmp.GridDemoTemplateComponent
    , cmp.GridDemoComponent
    , cmp.GridFilterComponent
    , cmp.TreeviewDemoComponent
    // Custom Widgets just for Demo
    , cmp.TabsComponent
    , cmp.MinitabsComponent,
    cmp.MinitabsComponent,
    cmp.TabsComponent,
    cmp.AboutComponent,
    cmp.HomeComponent,
    DropdownDirective,
    PercentPipe
  ],
  bootstrap: [cmp.RootComponent],
  providers: [
      PercentPipe,
      SiteApiService        // just for demo to get some static data
    , EmitterService        // simple publish/subscribe pattern to distribute data
    , { provide: LocationStrategy, useClass: HashLocationStrategy },
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
