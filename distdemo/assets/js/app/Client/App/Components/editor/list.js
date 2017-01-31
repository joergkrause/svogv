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
var SiteApiService_1 = require("../../Services/SiteApiService");
var UserViewModel_1 = require("../../ViewModels/UserViewModel");
var svogv_1 = require("svogv");
var ListEditorComponent = (function () {
    function ListEditorComponent(apiService, router) {
        this.apiService = apiService;
        this.router = router;
        console.log('Users&List ctor');
    }
    ListEditorComponent.prototype.ngOnInit = function () {
        var _this = this;
        // we need to manage this because the component may load at any time, even after the broadcast has been gone
        // get dashboard data on load and distribute to all listening components
        this.apiService.getUsers().subscribe(function (data) {
            _this.renderData(data);
        });
    };
    ListEditorComponent.prototype.renderData = function (data) {
        // typeInfo is an artifical instance to get access to the meta data JavaScript cannot provide through type info alone
        var t = new UserViewModel_1.UserViewModel();
        // we get a regular array here, but grid expects GridData for proper rendering
        this.users = new svogv_1.AcDataGridModel(data, t);
    };
    ListEditorComponent.prototype.editUser = function (user) {
        this.router.navigate(['/editor/edit', user.id]);
    };
    ListEditorComponent.prototype.addUser = function () {
        this.router.navigate(['/editor/new']);
    };
    ListEditorComponent.prototype.removeUser = function (user) {
        this.router.navigate(['/editor/delete', user.id]);
    };
    return ListEditorComponent;
}());
ListEditorComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: './list.html'
    }),
    __metadata("design:paramtypes", [SiteApiService_1.SiteApiService, router_1.Router])
], ListEditorComponent);
exports.ListEditorComponent = ListEditorComponent;
