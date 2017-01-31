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
var NewEditorComponent = (function () {
    function NewEditorComponent(apiService, route, router, formService) {
        this.apiService = apiService;
        this.route = route;
        this.router = router;
        this.formService = formService;
        this.saveResult = false;
    }
    NewEditorComponent.prototype.ngOnInit = function () {
        var _this = this;
        // get validators and error messages from viewmodel type     
        this.userForm = this.formService.build(UserViewModel_1.UserViewModel);
        // register changes
        this.userForm.valueChanges.subscribe(function (data) { return _this.onValueChanged(data); });
    };
    NewEditorComponent.prototype.onValueChanged = function (data) {
        // TODO: one may implement autosave here
    };
    // save an item
    NewEditorComponent.prototype.saveUser = function () {
        var _this = this;
        if (this.userForm.valid) {
            this.apiService
                .newUser(this.userForm.value)
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
    NewEditorComponent.prototype.closeForm = function () {
        this.router.navigate(['/editor/list']);
    };
    return NewEditorComponent;
}());
NewEditorComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: './new.html',
        styles: [
            'fieldset { margin: 16px; padding: 0px 16px 16px 16px; border: 1px solid silver; border-radius: 2px; }',
            'legend { padding: 0px 16px 0px 16px; width: auto; }'
        ]
    }),
    __metadata("design:paramtypes", [SiteApiService_1.SiteApiService,
        router_1.ActivatedRoute,
        router_1.Router,
        svogv_1.FormValidatorService])
], NewEditorComponent);
exports.NewEditorComponent = NewEditorComponent;
