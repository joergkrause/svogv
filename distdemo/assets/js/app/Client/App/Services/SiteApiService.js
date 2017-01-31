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
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
var UserViewModel_1 = require("../ViewModels/UserViewModel");
/**
 * This service just simulates a user store to keep the demo running without further dependencies.
 *
 */
var SiteApiService = (function () {
    function SiteApiService() {
        // some static demo data
        var u1 = new UserViewModel_1.UserViewModel();
        u1.id = 1;
        u1.email = 'Paul@parker.com';
        u1.phoneNumber = '030-123456';
        u1.userName = 'Paul Parker';
        var u2 = new UserViewModel_1.UserViewModel();
        u2.id = 2;
        u2.email = 'wilma@workshop.com';
        u2.phoneNumber = '055-123456';
        u2.userName = 'Wilma Workshop';
        var u3 = new UserViewModel_1.UserViewModel();
        u3.id = 3;
        u3.email = 'theodor@trainer.com';
        u3.phoneNumber = '088-123456';
        u3.userName = 'Theodor Trainer';
        var u4 = new UserViewModel_1.UserViewModel();
        u4.id = 4;
        u4.email = 'bill@boss.com';
        u4.phoneNumber = '001-55998877';
        u4.userName = 'Bill Boss';
        this.users = new Array();
        this.users.push(u1);
        this.users.push(u2);
        this.users.push(u3);
        this.users.push(u4);
    }
    /// User
    SiteApiService.prototype.getUser = function (id) {
        var user = this.users.filter(function (u) { return u.id == id; })[0];
        return Observable_1.Observable.create(function (o) { return o.next(user); });
    };
    SiteApiService.prototype.getUsers = function () {
        var _this = this;
        return Observable_1.Observable.create(function (o) { return o.next(_this.users); });
    };
    SiteApiService.prototype.newUser = function (user) {
        // assure new id in simulated data stack
        var nextId = this.users.sort(function (u1, u2) { return u1.id - u2.id; }).slice(-1).pop().id + 1;
        // assign
        user.id = nextId;
        // save
        this.users.push(user);
        // always true 
        return Observable_1.Observable.create(function (o) { return true; });
    };
    SiteApiService.prototype.editUser = function (id, user) {
        var user = this.users.filter(function (u) { return u.id == id; })[0];
        this.users.splice(this.users.indexOf(user), 1, user);
        // always true 
        return Observable_1.Observable.create(function (o) { return true; });
    };
    SiteApiService.prototype.deleteUser = function (id) {
        var user = this.users.filter(function (u) { return u.id == id; })[0];
        this.users.splice(this.users.indexOf(user), 1);
        // always true 
        return Observable_1.Observable.create(function (o) { return true; });
    };
    /// Common Functions
    SiteApiService.prototype.handleError = function (error) {
        console.error(error);
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    return SiteApiService;
}());
SiteApiService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], SiteApiService);
exports.SiteApiService = SiteApiService;
