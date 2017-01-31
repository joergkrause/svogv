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
var UserViewModel_1 = require("../../ViewModels/UserViewModel");
var EditEditorComponent = (function () {
    function EditEditorComponent(apiService, route, router, formService) {
        this.apiService = apiService;
        this.route = route;
        this.router = router;
        this.formService = formService;
        this.userId = 0;
    }
    EditEditorComponent.prototype.ngOnInit = function () {
        var _this = this;
        // get validators and error messages from viewmodel type     
        this.userForm = this.formService.build(UserViewModel_1.UserViewModel);
        // register changes
        this.userForm.valueChanges.subscribe(function (data) { return _this.onValueChanged(data); });
        // receive the param on init
        this.paramsSubscriber = this.route.params.subscribe(function (params) {
            _this.userId = +params['id'];
            _this.loadUser();
        });
    };
    EditEditorComponent.prototype.onValueChanged = function (data) {
        // TODO: one may implement autosave here
    };
    EditEditorComponent.prototype.ngOnDestroy = function () {
        this.paramsSubscriber.unsubscribe();
    };
    // Load a stored query
    EditEditorComponent.prototype.loadUser = function () {
        var _this = this;
        this.apiService
            .getUser(this.userId)
            .subscribe(function (data) {
            // patchValue here instead if setValue because the form's 
            // viewmodel is more complete than the form
            _this.userForm.patchValue(data, { onlySelf: true, emitEvent: false });
        });
    };
    // save an item
    EditEditorComponent.prototype.saveUser = function () {
        var _this = this;
        if (this.userForm.valid) {
            this.apiService
                .editUser(this.userId, this.userForm.value)
                .subscribe(function (result) {
                console.log('Update User successful');
                // refresh UI
                _this.saveResult = result;
                // broadcast that a change has been happend
                EmitterService_1.EmitterService.get('BROADCAST').emit();
                _this.closeForm();
            });
        }
    };
    EditEditorComponent.prototype.closeForm = function () {
        this.router.navigate(['/editor/list']);
    };
    return EditEditorComponent;
}());
EditEditorComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: './edit.html',
        styles: [
            'fieldset { margin: 16px; padding: 0px 16px 16px 16px; border: 1px solid silver; border-radius: 2px; }',
            'legend { padding: 0px 16px 0px 16px; width: auto; }'
        ]
    }),
    __metadata("design:paramtypes", [SiteApiService_1.SiteApiService,
        router_1.ActivatedRoute,
        router_1.Router,
        svogv_1.FormValidatorService])
], EditEditorComponent);
exports.EditEditorComponent = EditEditorComponent;
