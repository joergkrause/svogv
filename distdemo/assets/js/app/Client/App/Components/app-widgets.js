"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var svogv_1 = require("svogv");
/**
 * User Manager, defines the tabs that hold the child-outlets.
 */
var WidgetDemoComponent = (function () {
    function WidgetDemoComponent(router) {
        this.router = router;
        // we use the router as a global configuration point here
        var userRoutes = new Array();
        router.config
            .filter(function (route, idx) { return route.path === 'widgets'; })
            .shift()
            .children
            .filter(function (route, idx) { return !route.redirectTo; })
            .forEach(function (subroute) { return userRoutes.push(new svogv_1.AcTab(['/widgets', subroute.path], subroute.data['title'], !!subroute.data['active'], !!subroute.data['disabled'])); });
        this.widgetTabs = new svogv_1.AcTabData(userRoutes);
    }
    return WidgetDemoComponent;
}());
WidgetDemoComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'app-widgets',
        templateUrl: './app-widgets.html'
    }),
    __metadata("design:paramtypes", [router_1.Router])
], WidgetDemoComponent);
exports.WidgetDemoComponent = WidgetDemoComponent;
