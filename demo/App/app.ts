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
import * as wd from './Components/Widgets/index';
// routes' configuration
import routes from './Configurations/routes';
// flux store
import { StoreModule } from '@ngrx/store';
import { studyCountReducer } from './Utils/study.store';

@NgModule({
    imports: [
      BrowserModule,
      HttpModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule.forRoot(routes),
      StoreModule.provideStore({
        studies: studyCountReducer
      })
    ],
    declarations: [
      // composition tree of components
      cmp.SiteNavComponent,
      cmp.SiteRootComponent,
      cmp.SiteAboutComponent,
      cmp.SiteContactComponent,
      cmp.DashboardComponent,
      cmp.OthersComponent,
      cmp.StudiesComponent, cmp.ListStudyComponent, cmp.NewStudyComponent, cmp.EditStudyComponent, cmp.CloseStudyComponent, cmp.AbortStudyComponent, cmp.DeleteStudyComponent,
      cmp.UsersComponent, cmp.ListUserComponent, cmp.NewUserComponent, cmp.EditUserComponent, cmp.DeleteUserComponent,
      // simple Bootstrap widgets
      wd.TreeView, wd.TreeViewNode,
      wd.SideMenu, wd.BreadCrumb, wd.DataGridPagination, wd.InfoBox, wd.Tabs, wd.Editor
    ],
    bootstrap: [cmp.SiteRootComponent],
    providers: [SiteApiService, { provide: LocationStrategy, useClass: HashLocationStrategy }]
})
export class RootModule {
}

platformBrowserDynamic().bootstrapModule(RootModule);