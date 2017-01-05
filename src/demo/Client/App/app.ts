import { NgModule } from '@angular/core';
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
// The SVOGV library (direct link for testing, use node_modules for real life projects instead)
import * as wd from '../../../lib/widgets';
// routes' configuration
import routes from './Configurations/routes';

@NgModule({
    imports: [
      BrowserModule,
      HttpModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule.forRoot(routes)
    ],
    declarations: [
      // composition tree of components
      cmp.SiteNavComponent,
      cmp.SiteRootComponent,
      cmp.SiteAboutComponent,
      cmp.DashboardComponent,
      cmp.UsersComponent, cmp.ListUserComponent, cmp.NewUserComponent, cmp.EditUserComponent, cmp.DeleteUserComponent,
      // simple Bootstrap widgets
      wd.AcTreeView, wd.AcTreeViewNode,
      wd.AcSideMenu, wd.AcBreadCrumb, wd.AcDataGridPagination, wd.AcInfoBox, wd.AcTabs, wd.AcEditor
    ],
    bootstrap: [cmp.SiteRootComponent],
    providers: [SiteApiService, { provide: LocationStrategy, useClass: HashLocationStrategy }]
})
export class RootModule {
}

platformBrowserDynamic().bootstrapModule(RootModule);