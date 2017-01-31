"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var platform_browser_1 = require("@angular/platform-browser");
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
// access to WebAPI
var SiteApiService_1 = require("./Services/SiteApiService");
// custom components
var cmp = require("./Components/index");
// routes' configuration
var routes_1 = require("./Configurations/routes");
// The SVOGV library (in the demo it's a hard link with paths info in tsconfig, 
// resolves against node_modules without changes)
var wd = require("svogv");
var svogv_1 = require("svogv");
var RootModule = (function () {
    function RootModule() {
    }
    return RootModule;
}());
RootModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            http_1.HttpModule,
            forms_1.FormsModule,
            forms_1.ReactiveFormsModule,
            router_1.RouterModule.forRoot(routes_1.default)
        ],
        declarations: [
            // Demo app
            cmp.SiteNavComponent,
            cmp.SiteRootComponent,
            cmp.SiteAboutComponent,
            cmp.DashboardComponent,
            cmp.EditorDemoComponent,
            cmp.ListEditorComponent, cmp.NewEditorComponent,
            cmp.EditEditorComponent, cmp.DeleteEditorComponent,
            cmp.WidgetDemoComponent,
            cmp.ListWidgetsComponent,
            cmp.AnalogClockComponent, cmp.TreeviewComponent, cmp.LoaderIconComponent,
            wd.AcTreeView, wd.AcTreeViewNode,
            wd.AcSideMenu, wd.AcDropMenu, wd.AcBreadCrumb,
            wd.AcDataGridPagination, wd.AcInfoBox, wd.AcTabs, wd.AcEditor,
            wd.AcAnalogClock, wd.AcLoaderIcon,
            wd.Dropdown, wd.DropdownToggle, wd.AutoForm
        ],
        bootstrap: [cmp.SiteRootComponent],
        providers: [SiteApiService_1.SiteApiService // just for demo to get some static data
            ,
            svogv_1.FormValidatorService // the forms support, manages the decorators
            ,
            svogv_1.DropdownService // supports the dropdown menu events 
            ,
            { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy }]
    })
], RootModule);
exports.RootModule = RootModule;
core_1.enableProdMode();
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(RootModule);
