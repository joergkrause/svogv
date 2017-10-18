import { NgModule, enableProdMode } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
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
// resolves against node_modules without changes)
import { SvogvModule, FormValidatorService, WindowRef } from 'svogv';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    SvogvModule
  ],
  declarations: [
    // Demo app
    cmp.SiteNavComponent
    , cmp.SiteRootComponent
    , cmp.SiteAboutComponent
    , cmp.DashboardComponent
    // Editor, Validation & Grid
    , cmp.EditorDemoComponent, cmp.EditAutoformEditorComponent
    , cmp.ListEditorComponent, cmp.NewEditorComponent
    , cmp.EditEditorComponent, cmp.DeleteEditorComponent
    // Widget Demos
    , cmp.WidgetDemoComponent
    , cmp.ListWidgetsComponent
    , cmp.AnalogClockComponent
    , cmp.TreeviewComponent
    , cmp.LoaderIconComponent
    // Custom Widgets just for Demo
    , cmp.AcSideMenuComponent
    , cmp.AcBreadCrumbComponent
    , cmp.AcTabsComponent
  ],
  bootstrap: [cmp.SiteRootComponent],
  providers: [
      SiteApiService        // just for demo to get some static data
    , FormValidatorService  // the forms support, manages the decorators
    , { provide: LocationStrategy, useClass: HashLocationStrategy }
    , WindowRef]
})
export class RootModule {
}
// uncomment to use in production
enableProdMode();
platformBrowserDynamic().bootstrapModule(RootModule);
