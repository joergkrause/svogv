import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AcTreeNode } from './models/index';

@Component({
    selector: 'ac-tree',
    template: `<ul class="treeview">
                 <ac-treenode [node]="nodes" 
                               (nodeClick)="onNodeClick($event)" 
                               (checkChanged)="onCheckChanged($event)"
                               (selectedChanged)="onSelectedChanged($event)"
                               (collapseChanged)="onCollapseChanged($event)"
                  ></ac-treenode>
               </ul>`,
    styles: ['.treeview { list-style: none; margin-left: -25px; }']
}) //
export class AcTreeView {
    @Input() nodes: AcTreeNode;
    @Output() nodeClick: EventEmitter<AcTreeNode> = new EventEmitter<AcTreeNode>();
    @Output() checkChanged: EventEmitter<AcTreeNode> = new EventEmitter<AcTreeNode>();
    @Output() selectedChanged: EventEmitter<AcTreeNode> = new EventEmitter<AcTreeNode>();
    @Output() collapseChanged: EventEmitter<AcTreeNode> = new EventEmitter<AcTreeNode>();

    constructor() {

    }

    onNodeClick(node: AcTreeNode) {
        this.nodeClick.emit(node);
    }

    onCheckChanged(node: AcTreeNode) {
        this.checkChanged.emit(node);
    }

    onSelectedChanged(node: AcTreeNode) {
        this.selectedChanged.emit(node);
    }

    onCollapseChanged(node: AcTreeNode) {
        this.collapseChanged.emit(node);
    }

    ngOnChanges(): void {
        return;

    }

}
