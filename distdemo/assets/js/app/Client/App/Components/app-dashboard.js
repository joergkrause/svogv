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
var EmitterService_1 = require("../Services/EmitterService");
var SiteApiService_1 = require("../Services/SiteApiService");
/**
 * Dashboard shows global data. The data are retrieved in the root and broadcastet,
 * the broadcaster can use redux to store as state.
 */
var DashboardComponent = (function () {
    function DashboardComponent(apiService) {
        var _this = this;
        this.apiService = apiService;
        this.users = [];
        // raw data for tiles
        EmitterService_1.EmitterService.get('BROADCAST_Users').subscribe(function (data) {
            console.log('Dashboard received BROADCAST_Users event');
            _this.users = data;
        });
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log('Dashboard initializing');
        // retrieve fresh data on init, independently of the broadcast
        this.apiService.getUsers().subscribe(function (data) {
            _this.users = data;
        });
    };
    return DashboardComponent;
}());
DashboardComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'app-dashboard',
        templateUrl: './app-dashboard.html'
    }),
    __metadata("design:paramtypes", [SiteApiService_1.SiteApiService])
], DashboardComponent);
exports.DashboardComponent = DashboardComponent;
