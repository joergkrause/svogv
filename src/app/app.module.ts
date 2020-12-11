import { NgModule, Injector, Pipe, PipeTransform } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
// access to WebAPI
import { SiteApiService, EmitterService } from './services';
// custom components
import * as cmp from './components';
// routes' configuration
import { routes } from './configurations/routes';

import { SvogvBootstrapModule } from '../../projects/bootstrap-ui/src/public-api'; // FormValidatorFromJsonService
import { PercentPipe } from './viewmodels/pipe/percent.pipe';
import { MinitabsComponent } from './components/ui/tabs/minitabs/minitabs.component';
import { TabsComponent } from './components/ui/tabs/tabs/tabs.component';
import { DropdownDirective } from './directives/dropdown.directive';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    SvogvBootstrapModule.forRoot()
  ],
  declarations: [
    // Demo app
    cmp.RootComponent
    // Editor, Validation & Grid
    , cmp.EditorDemoComponent
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
    , cmp.TreeviewDemoComponent
    // Custom Widgets just for Demo
    , cmp.TabsComponent
    , cmp.MinitabsComponent,
    PercentPipe,
    MinitabsComponent,
    TabsComponent,
    DropdownDirective
  ],
  bootstrap: [cmp.RootComponent],
  providers: [
      PercentPipe,
      SiteApiService        // just for demo to get some static data
    , EmitterService        // simple publish/subscribe pattern to distribute data
    , { provide: LocationStrategy, useClass: HashLocationStrategy }
  ]
})
export class AppModule {
}
