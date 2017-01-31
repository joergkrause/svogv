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
var svogv_1 = require("svogv");
/**
 * View Model for table view.
 *
 * The intializer (= 0 and = '') are required to force the TS compiler to create properties. This is required to loop the element
 *
 */
var UserViewModel = (function () {
    function UserViewModel() {
        this.id = 0;
        this.email = '';
        this.phoneNumber = '';
        this.userName = '';
        this.age = 10;
        this.passWord = '';
        this.passWordTwo = '';
    }
    return UserViewModel;
}());
__decorate([
    svogv_1.Hidden(),
    __metadata("design:type", Number)
], UserViewModel.prototype, "id", void 0);
__decorate([
    svogv_1.Display('E-Mail', 'E-Mail address'),
    svogv_1.Required(),
    svogv_1.MaxLength(100),
    svogv_1.Email(),
    __metadata("design:type", String)
], UserViewModel.prototype, "email", void 0);
__decorate([
    svogv_1.Display('Phone Number', 'The user\'s phone'),
    svogv_1.Required(),
    svogv_1.MaxLength(20),
    __metadata("design:type", String)
], UserViewModel.prototype, "phoneNumber", void 0);
__decorate([
    svogv_1.Display('User Name', 'The full name'),
    svogv_1.Required(),
    svogv_1.MaxLength(100),
    __metadata("design:type", String)
], UserViewModel.prototype, "userName", void 0);
__decorate([
    svogv_1.Display('Age', 'From 12 to 88'),
    svogv_1.Range(12, 88),
    __metadata("design:type", Object)
], UserViewModel.prototype, "age", void 0);
__decorate([
    svogv_1.Display('Password'),
    svogv_1.Required(),
    svogv_1.Compare('passWordTwo'),
    __metadata("design:type", String)
], UserViewModel.prototype, "passWord", void 0);
__decorate([
    svogv_1.Display('Password'),
    svogv_1.Required(),
    __metadata("design:type", String)
], UserViewModel.prototype, "passWordTwo", void 0);
exports.UserViewModel = UserViewModel;
