import { NgModule, Injector, Pipe, PipeTransform } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
// access to WebAPI
import { SiteApiService } from './services/index';
// custom components
import * as cmp from './components/index';
// routes' configuration
import routes from './configurations/routes';

// The SVOGV library (in the demo it's a hard link with paths info in tsconfig,
import { FormValidatorService, FormValidatorFromJsonService, WindowRef, SvogvModule } from 'svogv';

@Pipe({
  name: 'demo',
})
export class DemoPipe implements PipeTransform {
  transform(value: any, ...args: any[]) {
    // do nothing, just shows injectibility
    return value;
  }
}

const injector = Injector.create({providers: [{provide: DemoPipe, deps: []}]});

const svogvModule = SvogvModule.forRoot(injector);
const routerModule = RouterModule.forRoot(routes);

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    routerModule,
    svogvModule
  ],
  declarations: [
    // Demo app
    cmp.SiteNavComponent
    , cmp.SiteRootComponent
    , cmp.SiteAboutComponent
    , cmp.DashboardComponent
    // Editor, Validation & Grid
    , cmp.EditorDemoComponent
    , cmp.EditAutoformEditorComponent
    , cmp.ListEditorComponent
    , cmp.NewEditorComponent
    , cmp.EditEditorComponent
    , cmp.DeleteEditorComponent
    // Widget Demos
    , cmp.WidgetDemoComponent
    , cmp.ListWidgetsComponent
    , cmp.TreeviewComponent
    // Custom Widgets just for Demo
    , cmp.AcSideMenuComponent
    , cmp.AcBreadCrumbComponent
    , cmp.AcTabsComponent
    // Demo Pipe
    , DemoPipe
  ],
  bootstrap: [cmp.SiteRootComponent],
  providers: [
      SiteApiService        // just for demo to get some static data
    , { provide: LocationStrategy, useClass: HashLocationStrategy }
    , WindowRef
    , FormValidatorService, FormValidatorFromJsonService  // the forms support, manages the decorators
  ]
})
export class RootModule {
}
