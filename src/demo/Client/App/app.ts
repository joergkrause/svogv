import { NgModule, enableProdMode } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic }  from '@angular/platform-browser-dynamic';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
// access to WebAPI
import { SiteApiService } from './Services/SiteApiService';
// custom components
import * as cmp from './Components/index';
// routes' configuration
import routes from './Configurations/routes';
// The SVOGV library (in the demo it's a hard link with paths info in tsconfig, resolves against node_modules without changes)
import * as wd from 'svogv';
import { FormValidatorService, DropdownService } from 'svogv';

@NgModule({
    imports: [
      BrowserModule,
      HttpModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule.forRoot(routes)
    ],
    declarations: [
      // Demo app
      cmp.SiteNavComponent
      ,cmp.SiteRootComponent
      ,cmp.SiteAboutComponent
      ,cmp.DashboardComponent
      // Editor, Validation & Grid
      ,cmp.EditorDemoComponent 
      ,cmp.ListEditorComponent, cmp.NewEditorComponent, cmp.EditEditorComponent, cmp.DeleteEditorComponent
      // Widgets 
      ,cmp.WidgetDemoComponent
      ,cmp.ListWidgetsComponent 
      ,cmp.AnalogClockComponent, cmp.TreeviewComponent, cmp.LoaderIconComponent
      // simple Bootstrap widgets
      ,wd.AcTreeView, wd.AcTreeViewNode
      ,wd.AcSideMenu, wd.AcDropMenu, wd.AcBreadCrumb, wd.AcDataGridPagination, wd.AcInfoBox, wd.AcTabs, wd.AcEditor
      // SVG widget
      ,wd.AcAnalogClock, wd.AcLoaderIcon
      // Supporting Directives
      , wd.Dropdown, wd.DropdownToggle, wd.AutoForm
    ],
    bootstrap: [cmp.SiteRootComponent],
    providers: [SiteApiService         // just for demo to get some static data
               , FormValidatorService  // the forms support, manages the decorators
               , DropdownService       // supports the dropdown menu events 
               , { provide: LocationStrategy, useClass: HashLocationStrategy }]
})
export class RootModule {
}
enableProdMode();
platformBrowserDynamic().bootstrapModule(RootModule);