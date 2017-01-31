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
var svogv_1 = require("svogv");
var TreeviewComponent = (function () {
    function TreeviewComponent() {
        // raw data for treeview
        var options = new svogv_1.AcTreeNodeOptions();
        options.backColor = '#fff';
        options.checkable = false;
        options.color = 'blue';
        options.collapsable = true;
        options.selectable = true;
        var optionsc = new svogv_1.AcTreeNodeOptions();
        optionsc.backColor = 'yellow';
        optionsc.checkable = true;
        optionsc.color = 'red';
        optionsc.collapsable = true;
        optionsc.selectable = true;
        var optionsi = new svogv_1.AcTreeNodeOptions();
        optionsi.backColor = '#fff';
        optionsi.checkable = false;
        optionsi.color = 'green';
        optionsi.collapsable = true;
        optionsi.icon = "fa-glass";
        optionsi.iconColor = "silver";
        optionsi.selectable = false;
        this.treeData = new svogv_1.AcTextTreeNode('Root node', options, [
            new svogv_1.AcTextTreeNode('Child node #1', options),
            new svogv_1.AcTextTreeNode('Child node #2', optionsi),
            new svogv_1.AcTextTreeNode('Child node #3', options),
            new svogv_1.AcTextTreeNode('Child node #4', options, [
                new svogv_1.AcTextTreeNode('Hello', options),
                new svogv_1.AcTextTreeNode('Ahoy', optionsc, [
                    new svogv_1.AcTextTreeNode('Child deep A', options),
                    new svogv_1.AcTextTreeNode('Child deep B', optionsi),
                    new svogv_1.AcTextTreeNode('Child deep C', options)
                ]),
                new svogv_1.AcTextTreeNode('Hola', optionsc),
            ]),
            new svogv_1.AcTextTreeNode('Child node #5', options),
        ]);
    }
    return TreeviewComponent;
}());
TreeviewComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'app-treeview',
        templateUrl: './treeview.html'
    }),
    __metadata("design:paramtypes", [])
], TreeviewComponent);
exports.TreeviewComponent = TreeviewComponent;
