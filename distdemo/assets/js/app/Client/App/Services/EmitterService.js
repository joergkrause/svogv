"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
/**
 * Broadcast events through components using a publish/subscribe pattern.
 */
var EmitterService = (function () {
    function EmitterService() {
    }
    EmitterService.get = function (ID) {
        console.log("Emitter for " + ID + " called");
        if (!this._emitters[ID]) {
            console.log("Emitter for " + ID + " added");
            this._emitters[ID] = new core_1.EventEmitter();
        }
        else {
            console.log("Emitter for " + ID + " exists");
        }
        return this._emitters[ID];
    };
    return EmitterService;
}());
EmitterService._emitters = {};
EmitterService = __decorate([
    core_1.Injectable()
], EmitterService);
exports.EmitterService = EmitterService;
