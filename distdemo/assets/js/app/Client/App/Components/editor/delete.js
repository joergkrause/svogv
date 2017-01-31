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
// public
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var svogv_1 = require("svogv");
// private
var SiteApiService_1 = require("../../Services/SiteApiService");
var EmitterService_1 = require("../../Services/EmitterService");
var DeleteEditorComponent = (function () {
    function DeleteEditorComponent(apiService, route, router, formService) {
        this.apiService = apiService;
        this.route = route;
        this.router = router;
        this.formService = formService;
        this.userId = 0;
    }
    DeleteEditorComponent.prototype.ngOnInit = function () {
        var _this = this;
        // receive the param on init
        this.paramsSubscriber = this.route.params.subscribe(function (params) {
            _this.userId = +params['id'];
            _this.loadUser();
        });
    };
    DeleteEditorComponent.prototype.ngOnDestroy = function () {
        this.paramsSubscriber.unsubscribe();
    };
    // Load a stored query
    DeleteEditorComponent.prototype.loadUser = function () {
        var _this = this;
        this.apiService
            .getUser(this.userId)
            .subscribe(function (data) {
            _this.user = data;
        });
    };
    // save an item
    DeleteEditorComponent.prototype.deleteItem = function () {
        var _this = this;
        if (this.userId) {
            this.apiService
                .deleteUser(this.userId)
                .subscribe(function (result) {
                console.log('Delete User successful');
                // refresh UI
                _this.saveResult = result;
                // broadcast that a change has been happend
                EmitterService_1.EmitterService.get('BROADCAST').emit();
                _this.closeForm();
            });
        }
    };
    DeleteEditorComponent.prototype.closeForm = function () {
        this.router.navigate(['/editor/list']);
    };
    return DeleteEditorComponent;
}());
DeleteEditorComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: './delete.html',
        styles: [
            'fieldset { margin: 16px; padding: 0px 16px 16px 16px; border: 1px solid silver; border-radius: 2px; }',
            'legend { padding: 0px 16px 0px 16px; width: auto; }'
        ]
    }),
    __metadata("design:paramtypes", [SiteApiService_1.SiteApiService,
        router_1.ActivatedRoute,
        router_1.Router,
        svogv_1.FormValidatorService])
], DeleteEditorComponent);
exports.DeleteEditorComponent = DeleteEditorComponent;
