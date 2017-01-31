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
// private
var router_1 = require("@angular/router");
var SiteApiService_1 = require("../Services/SiteApiService");
var EmitterService_1 = require("../Services/EmitterService");
var svogv_1 = require("svogv");
var SiteRootComponent = (function () {
    function SiteRootComponent(apiService, route) {
        var _this = this;
        this.apiService = apiService;
        this.route = route;
        // default on boot
        this.currentRoute = {
            'title': 'Dashboard', 'subtitle': 'SVOGV Demo'
        };
        // subscribe to router to change title
        this.route.data.subscribe(function (data) {
            console.log("SUBSCRIBE Route " + data + " " + data['title']);
            _this.currentRoute = data;
        });
        this.currentYear = new Date().getFullYear().toString();
        this.user = 'Fake User';
    }
    SiteRootComponent.prototype.loadData = function () {
        // create menu, this might be come from the server to handle rights & roles
        // the menu is forwarded to the sideMenu component through binding
        this.dynamicMenu = new svogv_1.AcMenu(new svogv_1.AcMenuHeaderItem('Tasks'), new svogv_1.AcMenuLinkItem('Dashboard', ['/dashboard'], 'fa-dashboard'), new svogv_1.AcMenuLinkItem('Forms Demo', ['/editor'], 'fa-user'), new svogv_1.AcMenuLinkItem('About', ['/about'], 'fa-database'), new svogv_1.AcMenuHeaderItem('Widgets'), new svogv_1.AcMenuLinkItem('Overview', ['/widgets'], 'fa-clock'));
        // get dashboard data on load and distribute to all listening components
        this.apiService.getUsers().subscribe(function (data) {
            EmitterService_1.EmitterService.get('BROADCAST_Users').emit(data);
        });
    };
    SiteRootComponent.prototype.ngOnInit = function () {
        this.loadData();
    };
    return SiteRootComponent;
}());
SiteRootComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'site-root',
        templateUrl: './site-root.html'
    }),
    __metadata("design:paramtypes", [SiteApiService_1.SiteApiService, router_1.ActivatedRoute])
], SiteRootComponent);
exports.SiteRootComponent = SiteRootComponent;
